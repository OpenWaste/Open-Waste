import gdown
import zipfile

LINK_TO_ZIP = 'https://drive.google.com/file/d/1lnniHRHTVvQEbiKjqILO0xZG0kq4T_zl/view?usp=sharing'
DATA_ZIPPED = 'utils/data/data.zip'
DATA_UNZIPPED = 'utils/data'

# Function to download and unzip data
def download():
    gdown.download(LINK_TO_ZIP, DATA_ZIPPED, fuzzy=True)

def unzip():
    with zipfile.ZipFile(DATA_ZIPPED, 'r') as zip_ref:
        zip_ref.extractall(DATA_UNZIPPED)

if __name__ == "__main__":
    download()
    unzip()