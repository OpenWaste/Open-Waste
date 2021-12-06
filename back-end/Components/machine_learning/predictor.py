import os.path
import torch
import torch.nn as nn
from torchvision import datasets, models, transforms
from PIL import Image


class Predictor:
    # Possible prediction classes
    # TODO: Add class names to DB instead of keeping them in a hard-coded constant
    __CLASS_NAMES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
    __ML_MODEL_PATH = os.path.join('Components', 'machine_learning', 'data', 'model.pt')

    # Setup transformation for image
    __IMG_SIZE = 224
    __loader = transforms.Compose([transforms.Resize(__IMG_SIZE), transforms.ToTensor()])

    def __init__(self):
        # Load model as it is in the model.pt file
        self.__model = models.resnet18(pretrained=True)
        num_ftrs = self.__model.fc.in_features
        for param in self.__model.parameters():
            param.requires_grad = False
        self.__model.fc = nn.Sequential(
            nn.Linear(num_ftrs, 256),
            nn.ReLU(),
            nn.Linear(256, len(Predictor.__CLASS_NAMES))
        )
        self.__model.load_state_dict(torch.load(Predictor.__ML_MODEL_PATH, map_location=torch.device('cpu')), strict=False)
        self.__model.eval()  # Set in evaluation mode (not training)

    def evaluate_image(self, image_path: str) -> str:
        # Load image
        image = Image.open(image_path)
        image = Predictor.__loader(image).float()

        # Predict
        prediction = self.__model(image[None, ...])  # pass image to model
        prediction = prediction.max(1, keepdim=True)[
            1]  # get max value in the first dimension of the tensor, preserve dimensions
        return Predictor.__CLASS_NAMES[prediction.item()]  # grab index and use to take classname
