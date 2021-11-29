# Machine Learning Utils

## Setup
To be able to run the code, you must have python installed and run `pip install -r requirements.txt`, which installs the required packages for the scripts to run.

If any modules still show up as not found, simply run `pip install <module name>`.

Also run the following for specific versions of packages required to use your GPU during training:
`pip3 install torch==1.10.0+cu102 torchvision==0.11.1+cu102 torchaudio===0.10.0+cu102 -f https://download.pytorch.org/whl/cu102/torch_stable.html`

Note: The following scripts must be run from the root directory, or else the logic that navigates the file system becomes erroneous.

## download.py
Run this script using `python utils/download.py` to download a copy of the garythung/trashnet dataset as a ZIP file and unzip it (the copy is already sorted into training and validation data).

## model.py
Run this script using `python utils/model.py` to train on the dataset, the model is saved as a file called `model.pt` that can be loaded in again later on.

Note: If you do not have a GPU or PyTorch cannot detect yours, change `gpus=1` to `gpus=0` in the Trainer call near the end of the file.