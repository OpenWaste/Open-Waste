import gdown
import zipfile
import os
import shutil

LINK_TO_ZIP = 'https://drive.google.com/file/d/1qKuw19chchrMF0MUD9sdIUhxZhMicTSh/view?usp=sharing'
DATA_ZIPPED = 'utils/data/data.zip'
DATA_UNZIPPED = 'utils/data'

# Delete any previous data
def cleanup():
    if os.path.exists(DATA_UNZIPPED):
        shutil.rmtree(DATA_UNZIPPED)

# Create data folder
def create_folder():
    os.makedirs(DATA_UNZIPPED)

# Function to download and unzip data
def download():
    gdown.download(LINK_TO_ZIP, DATA_ZIPPED, fuzzy=True)

def unzip():
    with zipfile.ZipFile(DATA_ZIPPED, 'r') as zip_ref:
        zip_ref.extractall(DATA_UNZIPPED)

if __name__ == "__main__":
    cleanup()
    create_folder()
    download()
    unzip()