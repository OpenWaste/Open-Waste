import gdown
import zipfile
import os

LINK_TO_ZIP = 'https://drive.google.com/file/d/1lnniHRHTVvQEbiKjqILO0xZG0kq4T_zl/view?usp=sharing'
DATA_ZIPPED = 'utils/data/data.zip'
DATA_UNZIPPED = 'utils/data'

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
    create_folder()
    download()
    unzip()