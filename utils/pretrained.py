from torchvision import models, transforms
from PIL import Image
import torch

#pretrained model loading
alexnet = models.alexnet(pretrained=True)

#transforming input image to appropriate size
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

#load and transform input image
img = Image.open('utils/wine.jpg')
img = transform(img)

#prepare batch to be passed to model
batch = torch.unsqueeze(img, 0)

#evaluate
alexnet.eval()
output = alexnet(batch)

# The output has unnormalized scores. To get probabilities, you can run a softmax on it.
probabilities = torch.nn.functional.softmax(output[0], dim=0)

# Read the categories
with open("utils/imagenet_classes.txt", "r") as f:
    categories = [s.strip() for s in f.readlines()]
# Show top categories per image
top5_prob, top5_catid = torch.topk(probabilities, 5)
for i in range(top5_prob.size(0)):
    print(categories[top5_catid[i]], top5_prob[i].item())