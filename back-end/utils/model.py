from __future__ import print_function, division

import os, glob
from PIL import Image

import yaml
import torch
import torch.nn as nn
import torch.optim as optim
import pytorch_lightning as pl
from torch.utils.data import Dataset, DataLoader
from torchvision import models, transforms
from sklearn.model_selection import train_test_split

import pytorch_lightning as pl
from pytorch_lightning import Trainer
from pytorch_lightning.loggers import WandbLogger
from pytorch_lightning.callbacks import ModelCheckpoint
from pytorch_lightning.callbacks.early_stopping import EarlyStopping

with open('utils/hparams.yaml') as f:
    HPARAMS = yaml.load(f, Loader=yaml.FullLoader)

MODEL_SAVE_PATH = 'Components/machine_learning/data/model.ckpt'
CHECKPOINT_SAVE_PATH = 'utils/checkpoints/'

train_dir = 'utils/data/train/'
test_dir = 'utils/data/test/'
# FilePath List
train_img_path = [os.path.normpath(i) for i in glob.glob(os.path.join(train_dir, '*/*.jpg'))]
test_img_path = [os.path.normpath(i) for i in glob.glob(os.path.join(test_dir, '*/*.jpg'))]

# Data Augmentation
class ImageTransform():
    def __init__(self, img_size=224, mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)):
        self.data_transform = {
            'train': transforms.Compose([
                transforms.RandomResizedCrop(img_size),
                transforms.RandomHorizontalFlip(),
                transforms.ToTensor(),
                transforms.Normalize(mean, std)
            ]),
            'val': transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(img_size),
                transforms.ToTensor(),
                transforms.Normalize(mean, std)
            ]),
            'test': transforms.Compose([
                transforms.Resize(256),
                transforms.CenterCrop(img_size),
                transforms.ToTensor(),
                transforms.Normalize(mean, std)
            ]),
        }

    def __call__(self, img, phase):
        return self.data_transform[phase](img)

# Datasets
class TrashDataset(Dataset):
    TRASH_LABELS = {
        'cardboard': 0,
        'glass': 1,
        'metal': 2,
        'paper': 3,
        'plastic': 4,
        'trash': 5,
    }

    def __init__(self, file_list, transform=None, phase='train'):
        self.file_list = file_list
        self.transform = transform
        self.phase = phase
        # Try block is here for server. Server doesn't download data since it's not training.
        try:
            self.labels = [self.TRASH_LABELS[os.path.basename(os.path.dirname(x))] for x in self.file_list]
        except KeyError:
            print("Download the data if you're trying to train!")

    def __len__(self):
        return len(self.file_list)

    def __getitem__(self, idx):
        img_path = self.file_list[idx]
        img = Image.open(img_path)
        img_transformed = self.transform(img, self.phase)

        label = self.labels[idx]

        return img_transformed, label

# Defines the Model and Image Transformations
# Accepts hyperparameters to change settings between runs
class ModelSystem(pl.LightningModule):
    def __init__(self, img_path, criterion, batch_size, img_size):
        super(ModelSystem, self).__init__()
        self.criterion = criterion
        self.batch_size = batch_size
        self.img_size = img_size

        # Load Data #########################
        self.img_path = img_path
        # Split Train/Val Data
        self.train_img_path, self.val_img_path = train_test_split(self.img_path)
        # Dataset
        self.train_dataset = TrashDataset(self.train_img_path, ImageTransform(self.img_size), phase='val')
        self.val_dataset = TrashDataset(self.val_img_path, ImageTransform(self.img_size), phase='val')

        # Model #############################
        # Pretrained model
        self.classifier = models.resnet18(pretrained=True)
        
        # Freeze the pretrained part of the model
        # for param in self.classifier.parameters():
        #     param.requires_grad = False

        # Create learning space for model and change output size of last layer
        self.classifier.fc = nn.Sequential(
            nn.Linear(self.classifier.fc.in_features, 256),
            nn.ReLU(),
            nn.Linear(256, 6)
        )

        # Set Optimizer
        self.optimizer = optim.SGD(self.classifier.parameters(), lr=HPARAMS['learning_rate'], momentum=HPARAMS['momentum'])
        self.save_hyperparameters()

    # Method ############################
    # Set Train Dataloader
    def train_dataloader(self):
        '''
        REQUIRED
        Set Train Dataloader
        '''
        return DataLoader(self.train_dataset, batch_size=self.batch_size, shuffle=True, num_workers=4, pin_memory=True)

    # Set Valid Dataloader
    def val_dataloader(self):
        '''
        REQUIRED
        Set Validation Dataloader
        '''
        return DataLoader(self.val_dataset, batch_size=self.batch_size, shuffle=False, num_workers=4, pin_memory=True)

    def forward(self, x):
        return self.classifier(x)

    # Set optimizer and scheduler
    def configure_optimizers(self):
        # [optimizer], [scheduler]
        return [self.optimizer], []

    # Train Loop
    def training_step(self, batch, batch_idx):
        '''
        REQUIRED
        batch: Output from DataLoader
        batch_idx: Index of Batch
        '''

        # Output from DataLoader
        imgs, labels = batch

        # Prediction
        preds = self.forward(imgs)
        # Calc Loss
        loss = self.criterion(preds, labels)

        # Calc Accuracy
        _, preds = torch.max(preds, 1)
        accuracy = torch.sum(preds == labels).float() / preds.size(0)

        self.log('train_loss', loss, prog_bar=True, logger=True)
        self.log('train_accuracy', accuracy, prog_bar=True, logger=True)

        return loss
    
    # Validation Loop
    def validation_step(self, batch, batch_idx):
        '''
        OPTIONAL
        batch: Output from DataLoader
        batch_idx: Index of Batch
        '''
        # Output from Dataloader
        imgs, labels = batch
        
        # Prediction
        preds = self.forward(imgs)
        # Calc Loss
        loss = self.criterion(preds, labels)
        
        # Calc Accuracy
        _, preds = torch.max(preds, 1)
        accuracy = torch.sum(preds == labels).float() / preds.size(0)

        self.log('val_loss', loss, prog_bar=True, logger=True)
        self.log('val_accuracy', accuracy, prog_bar=True, logger=True)
        
        return {'val_loss': loss, 'val_accuracy': accuracy}

    # Aggegate Validation Result
    def validation_end(self, outputs):
        avg_loss = torch.stack([x['val_loss'] for x in outputs]).mean()
        avg_accuracy = torch.stack([x['val_accuracy'] for x in outputs]).mean()
        logs = {'avg_val_loss': avg_loss, 'avg_val_accuracy': avg_accuracy}
        torch.cuda.empty_cache()

        return {'avg_val_loss': avg_loss, 'log': logs}


if __name__ == '__main__':
    wandblogger = WandbLogger(project='attack-on-soen', entity='attack-on-soen')

    # Config  ################################################
    criterion = nn.CrossEntropyLoss()
    batch_size = HPARAMS['batch_size']
    img_size = 224
    epoch = HPARAMS['epoch']

    # Set LightningSystem  ################################################
    model = ModelSystem(train_img_path, criterion, batch_size, img_size)

    # Callbacks  ################################################
    # Save Model
    checkpoint_callback = ModelCheckpoint(dirpath=CHECKPOINT_SAVE_PATH, monitor='val_loss', mode='min', save_weights_only=True, save_top_k=1, every_n_epochs=1)
    # EarlyStopping: used for stopping early automatically if overfitting
    earlystopping = EarlyStopping(monitor='val_loss', min_delta=0.0, patience=3)

    # Trainer  ################################################
    trainer = Trainer(
        max_epochs=epoch, # Set Num Epoch
        default_root_dir=CHECKPOINT_SAVE_PATH, # Path for save lightning_logs
        callbacks=[checkpoint_callback, earlystopping],
        gpus=1 if torch.cuda.is_available() else 0, # GPU
        log_every_n_steps=HPARAMS['log_every_n_steps'],
        logger=wandblogger,
    )

    # Start Training!!  ################################################
    trainer.fit(model)
    
    # Save Model  ##########################################
    trainer.save_checkpoint(MODEL_SAVE_PATH)