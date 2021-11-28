# Machine Learning Utils

## download.py
Run this script to download a copy of the garythung/trashnet dataset as a ZIP file and unzip it (the copy is already sorted into training and validation data).

## model.py
Run this script to train on the dataset, the model is saved as a file called `model.pt` that can be loaded in again later on.

To be able to run the code, you must have python installed and run `pip install -r requirements.txt`, which installs the required packages for the scripts to run.

For some of the special packages, run:
`pip3 install torch==1.10.0+cu102 torchvision==0.11.1+cu102 torchaudio===0.10.0+cu102 -f https://download.pytorch.org/whl/cu102/torch_stable.html`

To run one of the scripts, simply run `python utils/download.py`, for instance, from the root directory.