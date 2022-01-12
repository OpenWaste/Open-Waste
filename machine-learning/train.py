import os
import val
import time
import yaml
import argparse
import numpy as np
from tqdm import tqdm
from copy import deepcopy
from datetime import datetime
from pathlib import Path

import torch
import torch.nn as nn
from torch.cuda import amp
from torch.optim import SGD, Adam, AdamW, lr_scheduler

from models.yolo import Model
from models.experimental import attempt_load
from utils.loss import ComputeLoss
from utils.plots import plot_labels
from utils.metrics import fitness
from utils.loggers import Loggers
from utils.callbacks import Callbacks
from utils.general import (LOGGER, methods, intersect_dicts, check_dataset, check_img_size, labels_to_class_weights, colorstr, strip_optimizer)
from utils.datasets import create_dataloader
from utils.torch_utils import EarlyStopping, ModelEMA

'''
TODO:
    Callbacks
    Imports/Requirements
    wandb logging ? utils?

    plot_label()

    delete old code

OPTIONAL:
    non-linear scheduler
'''

# Environment
FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]

def train(hyp, opt, device, callbacks):
    # Options
    save_dir = Path(opt.save_dir)
    data = opt.data
    freeze = opt.freeze
    batch_size = opt.batch_size
    epochs = opt.epochs

    # Directories
    w = save_dir / 'weights'
    w.mkdir(parents=True, exist_ok=True)
    last, best = w / 'last.pt', w / 'best.pt'

    # Hyperparameters
    with open(hyp, errors='ignore') as f:
        hyp = yaml.safe_load(f)  # load hyps dict
    LOGGER.info(colorstr('hyperparameters: ') + ', '.join(f'{k}={v}' for k, v in hyp.items()))

    # Loggers
    data_dict = None
    loggers = Loggers(save_dir, opt.weights, opt, hyp, LOGGER)
    if loggers.wandb:
        data_dict = loggers.wandb.data_dict

    # Register actions
    for k in methods(loggers):
        callbacks.register_action(k, callback=getattr(loggers, k))

    # Config
    plots = True
    cuda = device != 'cpu'
    data_dict = check_dataset(data)
    train_path, val_path = data_dict['train'], data_dict['val']
    nc = int(data_dict['nc']) # number of classes
    names = data_dict['names']
    assert len(names) == nc, f'{len(names)} names found for nc={nc} dataset'

    # Download pretrained model
    url = 'https://github.com/ultralytics/yolov5/releases/download/v6.0/yolov5s.pt'
    file = Path('yolov5s.pt')
    if file.exists():
        os.remove(file)
    try:
        torch.hub.download_url_to_file(url, file)
        assert file.exists()
    except:
        print(f'Could not download {file} from {url}')
        exit(-1)

    # Model (pretrained)
    weights = str(file)
    ckpt = torch.load(weights, map_location=device)
    model = Model(ckpt['model'].yaml, ch=3, nc=nc, anchors=hyp.get('anchors')).to(device)
    csd = ckpt['model'].float().state_dict()  # checkpoint state_dict as FP32
    csd = intersect_dicts(csd, model.state_dict())  # intersect
    model.load_state_dict(csd, strict=False)  # load
    LOGGER.info(f'Transferred {len(csd)}/{len(model.state_dict())} items from {weights}')  # report
    
    # Freeze layers
    freeze = [f'model.{x}.' for x in (freeze if len(freeze) > 1 else range(freeze[0]))] # to freeze
    for k, v in model.named_parameters():
        v.requires_grad = True
        if any(x in k for x in freeze):
            v.requires_grad = False

    # Image size
    gs = max(int(model.stride.max()), 32) # grid size (max stride)
    img_size = check_img_size(opt.imgsz, gs, floor=gs*2) # verify image size is a multiple of grid size

    # Optimizer
    nbs = 64  # nominal batch size
    accumulate = max(round(nbs / batch_size), 1)  # accumulate loss before optimizing
    hyp['weight_decay'] *= batch_size * accumulate / nbs  # scale weight_decay
    LOGGER.info(f"Scaled weight_decay = {hyp['weight_decay']}")

    g0, g1, g2 = [], [], []  # optimizer parameter groups
    for v in model.modules():
        if hasattr(v, 'bias') and isinstance(v.bias, nn.Parameter):  # bias
            g2.append(v.bias)
        if isinstance(v, nn.BatchNorm2d):  # weight (no decay)
            g0.append(v.weight)
        elif hasattr(v, 'weight') and isinstance(v.weight, nn.Parameter):  # weight (with decay)
            g1.append(v.weight)

    if opt.optimizer == 'Adam':
        optimizer = Adam(g0, lr=hyp['lr0'], betas=(hyp['momentum'], 0.999))  # adjust beta1 to momentum
    elif opt.optimizer == 'AdamW':
        optimizer = AdamW(g0, lr=hyp['lr0'], betas=(hyp['momentum'], 0.999))  # adjust beta1 to momentum
    else:
        optimizer = SGD(g0, lr=hyp['lr0'], momentum=hyp['momentum'], nesterov=True)

    optimizer.add_param_group({'params': g1, 'weight_decay': hyp['weight_decay']})  # add g1 with weight_decay
    optimizer.add_param_group({'params': g2})  # add g2 (biases)
    LOGGER.info(f"{colorstr('optimizer:')} {type(optimizer).__name__} with parameter groups "
                f"{len(g0)} weight, {len(g1)} weight (no decay), {len(g2)} bias")
    del g0, g1, g2

    # Scheduler
    lf = lambda x: (1 - x / (epochs - 1)) * (1.0 - hyp['lrf']) + hyp['lrf']  # linear
    scheduler = lr_scheduler.LambdaLR(optimizer, lr_lambda=lf)  # plot_lr_scheduler(optimizer, scheduler, epochs)

    # EMA (Exponential Moving Average of Weights)
    ema = ModelEMA(model)

    # Train Loader
    start_epoch, best_fitness = 0, 0.0
    train_loader, dataset = create_dataloader(train_path, img_size, batch_size, gs, hyp=hyp,
                                            augment=True, prefix=colorstr('train: '), shuffle=True)
    mlc = int(np.concatenate(dataset.labels, 0)[:, 0].max())  # max label class
    nb = len(train_loader)  # number of batches
    assert mlc < nc, f'Label class {mlc} exceeds nc={nc} in {data}. Possible class labels are 0-{nc - 1}'

    val_loader = create_dataloader(val_path, img_size, batch_size, gs, hyp=hyp, rect=True, pad=0.5, prefix=colorstr('val: '))[0]

    labels = np.concatenate(dataset.labels, 0)

    # plot_labels(labels, names, save_dir)

    callbacks.run('on_pretrain_routine_end')

    # Model attributes
    nl = model.model[-1].nl  # number of detection layers (to scale hyps)
    hyp['box'] *= 3 / nl  # scale to layers
    hyp['cls'] *= nc / 80 * 3 / nl  # scale to classes and layers
    hyp['obj'] *= (img_size / 640) ** 2 * 3 / nl  # scale to image size and layers
    hyp['label_smoothing'] = opt.label_smoothing
    model.nc = nc  # attach number of classes to model
    model.hyp = hyp  # attach hyperparameters to model
    model.class_weights = labels_to_class_weights(dataset.labels, nc).to(device) * nc  # attach class weights
    model.names = names

    # Start training
    t0 = time.time()
    nw = max(round(hyp['warmup_epochs'] * nb), 1000)  # number of warmup iterations, max(3 epochs, 1k iterations)
    # nw = min(nw, (epochs - start_epoch) / 2 * nb)  # limit warmup to < 1/2 of training
    last_opt_step = -1
    maps = np.zeros(nc)  # mAP per class
    results = (0, 0, 0, 0, 0, 0, 0)  # P, R, mAP@.5, mAP@.5-.95, val_loss(box, obj, cls)
    scheduler.last_epoch = start_epoch - 1  # do not move
    scaler = amp.GradScaler(enabled=cuda)
    stopper = EarlyStopping(patience=opt.patience)
    compute_loss = ComputeLoss(model)  # init loss class
    LOGGER.info(f'Image sizes {img_size} train, {img_size} val\n'
                f"Logging results to {colorstr('bold', save_dir)}\n"
                f'Starting training for {epochs} epochs...')

    for epoch in range(start_epoch, epochs):  # epoch ------------------------------------------------------------------
        model.train()

        mloss = torch.zeros(3, device=device)  # mean losses
        pbar = enumerate(train_loader)
        pbar = tqdm(pbar, total=nb, bar_format='{l_bar}{bar:10}{r_bar}{bar:-10b}')  # progress bar
        optimizer.zero_grad()
        for i, (imgs, targets, paths, _) in pbar:  # batch -------------------------------------------------------------
            ni = i + nb * epoch  # number integrated batches (since train start)
            imgs = imgs.to(device, non_blocking=True).float() / 255  # uint8 to float32, 0-255 to 0.0-1.0

            # Warmup
            if ni <= nw:
                xi = [0, nw]  # x interp
                # compute_loss.gr = np.interp(ni, xi, [0.0, 1.0])  # iou loss ratio (obj_loss = 1.0 or iou)
                accumulate = max(1, np.interp(ni, xi, [1, nbs / batch_size]).round())
                for j, x in enumerate(optimizer.param_groups):
                    # bias lr falls from 0.1 to lr0, all other lrs rise from 0.0 to lr0
                    x['lr'] = np.interp(ni, xi, [hyp['warmup_bias_lr'] if j == 2 else 0.0, x['initial_lr'] * lf(epoch)])
                    if 'momentum' in x:
                        x['momentum'] = np.interp(ni, xi, [hyp['warmup_momentum'], hyp['momentum']])

            # Forward
            with amp.autocast(enabled=cuda):
                pred = model(imgs)  # forward
                loss, loss_items = compute_loss(pred, targets.to(device))  # loss scaled by batch_size

            # Backward
            scaler.scale(loss).backward()

            # Optimize
            if ni - last_opt_step >= accumulate:
                scaler.step(optimizer)  # optimizer.step
                scaler.update()
                optimizer.zero_grad()
                if ema:
                    ema.update(model)
                last_opt_step = ni

            # Log
            mloss = (mloss * i + loss_items) / (i + 1)  # update mean losses
            mem = f'{torch.cuda.memory_reserved() / 1E9 if torch.cuda.is_available() else 0:.3g}G'  # (GB)
            pbar.set_description(('%10s' * 2 + '%10.4g' * 5) % (
                f'{epoch}/{epochs - 1}', mem, *mloss, targets.shape[0], imgs.shape[-1]))
            callbacks.run('on_train_batch_end', ni, model, imgs, targets, paths, plots, False)
            # end batch ------------------------------------------------------------------------------------------------

        # Scheduler
        lr = [x['lr'] for x in optimizer.param_groups]  # for loggers
        scheduler.step()

        #TODO:
        # mAP
        callbacks.run('on_train_epoch_end', epoch=epoch)
        ema.update_attr(model, include=['yaml', 'nc', 'hyp', 'names', 'stride', 'class_weights'])
        final_epoch = (epoch + 1 == epochs) # or stopper.possible_stop
        # Calculate mAP
        results, maps, _ = val.run(data_dict,
                                    batch_size=batch_size // 2,
                                    imgsz=img_size,
                                    model=ema.ema,
                                    dataloader=val_loader,
                                    save_dir=save_dir,
                                    plots=False,
                                    callbacks=callbacks,
                                    compute_loss=compute_loss)

        # Update best mAP
        fi = fitness(np.array(results).reshape(1, -1))  # weighted combination of [P, R, mAP@.5, mAP@.5-.95]
        if fi > best_fitness:
            best_fitness = fi
        log_vals = list(mloss) + list(results) + lr
        callbacks.run('on_fit_epoch_end', log_vals, epoch, best_fitness, fi)

        # Save model
        ckpt = {'epoch': epoch,
                'best_fitness': best_fitness,
                'model': deepcopy(model).half(),
                'ema': deepcopy(ema.ema).half(),
                'updates': ema.updates,
                'optimizer': optimizer.state_dict(),
                'wandb_id': loggers.wandb.wandb_run.id if loggers.wandb else None,
                'date': datetime.now().isoformat()}

        # Save last, best and delete
        torch.save(ckpt, last)
        if best_fitness == fi:
            torch.save(ckpt, best)
        if (epoch > 0) and (opt.save_period > 0) and (epoch % opt.save_period == 0):
            torch.save(ckpt, w / f'epoch{epoch}.pt')
        del ckpt
        callbacks.run('on_model_save', last, epoch, final_epoch, best_fitness, fi)

        # Stop Single-GPU
        # if RANK == -1 and stopper(epoch=epoch, fitness=fi):
        #     break

        # end epoch ----------------------------------------------------------------------------------------------------
    # end training -----------------------------------------------------------------------------------------------------

    LOGGER.info(f'\n{epoch - start_epoch + 1} epochs completed in {(time.time() - t0) / 3600:.3f} hours.')
    for f in last, best:
        if f.exists():
            strip_optimizer(f)  # strip optimizers
            if f is best:
                # LOGGER.info(f'\nValidating {f}...')
                results, _, _ = val.run(data_dict,
                                        batch_size=batch_size // 2,
                                        imgsz=img_size,
                                        model=attempt_load(f, device).half(),
                                        iou_thres=0.60,  # best pycocotools results at 0.65
                                        dataloader=val_loader,
                                        save_dir=save_dir,
                                        verbose=True,
                                        plots=True,
                                        callbacks=callbacks,
                                        compute_loss=compute_loss)  # val best model with plots

    callbacks.run('on_train_end', last, best, plots, epoch, results)
    LOGGER.info(f"Results saved to {colorstr('bold', save_dir)}")

    torch.cuda.empty_cache()
    return results


def parse_opt(known=False):
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', type=str, default=ROOT / 'yolov5s.pt', help='initial weights path')
    parser.add_argument('--data', type=str, default=ROOT / 'data/data.yaml', help='dataset.yaml path')
    parser.add_argument('--hyp', type=str, default=ROOT / 'data/hyps.yaml', help='hyperparameters path')
    parser.add_argument('--epochs', type=int, default=300)
    parser.add_argument('--batch-size', type=int, default=16, help='total batch size for all GPUs, -1 for autobatch')
    parser.add_argument('--imgsz', '--img', '--img-size', type=int, default=640, help='train, val image size (pixels)')
    parser.add_argument('--resume', nargs='?', const=True, default=False, help='resume most recent training')
    parser.add_argument('--noautoanchor', action='store_true', help='disable AutoAnchor')
    parser.add_argument('--bucket', type=str, default='', help='gsutil bucket')
    parser.add_argument('--device', default='', help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--multi-scale', action='store_true', help='vary img-size +/- 50%%')
    parser.add_argument('--optimizer', type=str, choices=['SGD', 'Adam', 'AdamW'], default='SGD', help='optimizer')
    parser.add_argument('--project', default=ROOT / 'runs/train', help='save to project/name')
    parser.add_argument('--name', default='exp', help='save to project/name')
    parser.add_argument('--linear-lr', action='store_true', help='linear LR')
    parser.add_argument('--label-smoothing', type=float, default=0.0, help='Label smoothing epsilon')
    parser.add_argument('--patience', type=int, default=100, help='EarlyStopping patience (epochs without improvement)')
    parser.add_argument('--freeze', nargs='+', type=int, default=[0], help='Freeze layers: backbone=10, first3=0 1 2')
    parser.add_argument('--save-period', type=int, default=-1, help='Save checkpoint every x epochs (disabled if < 1)')
    parser.add_argument('--save-dir', type=str, default=ROOT / 'output', help='Save directory for weights')

    # Weights & Biases arguments
    parser.add_argument('--entity', default=None, help='W&B: Entity')
    parser.add_argument('--upload_dataset', nargs='?', const=True, default=False, help='W&B: Upload data, "val" option')
    parser.add_argument('--bbox_interval', type=int, default=-1, help='W&B: Set bounding-box image logging interval')
    parser.add_argument('--artifact_alias', type=str, default='latest', help='W&B: Version of dataset artifact to use')

    opt = parser.parse_known_args()[0] if known else parser.parse_args()
    return opt

def main(opt, callbacks=Callbacks()):
    # Setup
    device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

    # Train
    train(opt.hyp, opt, device, callbacks)

if __name__ == "__main__":
    opt = parse_opt()
    main(opt)