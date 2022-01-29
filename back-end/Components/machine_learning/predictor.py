import os.path
from io import BytesIO

import torch
import torch.nn as nn
from torchvision import datasets, models, transforms
from PIL import Image

from utils.model import ModelSystem, TrashDataset


class Predictor:
    # Possible prediction classes loaded from model
    __CLASS_NAMES = {v: k for k, v in TrashDataset.TRASH_LABELS.items()}
    __ML_MODEL_PATH = os.path.join('Components', 'machine_learning', 'data', 'model.ckpt')

    # Setup transformation for image
    __IMG_SIZE = 224
    __loader = transforms.Compose([transforms.Resize(__IMG_SIZE), transforms.ToTensor()])

    def __init__(self):
        # Load model as it is in the model.pt file
        self.__model = ModelSystem.load_from_checkpoint(self.__ML_MODEL_PATH)
        self.__model.eval()  # Set in evaluation mode (not training)

    def evaluate_image(self, image_buffer: BytesIO) -> str:
        # Load image
        image = Image.open(image_buffer)
        image = Predictor.__loader(image).float()

        # Predict
        prediction = self.__model(image[None, ...])  # pass image to model
        # get max value in the first dimension of the tensor, preserve dimensions
        prediction = prediction.max(1, keepdim=True)[1]
        return Predictor.__CLASS_NAMES[prediction.item()]  # grab index and use to take classname
