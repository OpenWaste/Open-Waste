'''
This script downloads TACO's images from Flickr given an annotation json file
Code written by Pedro F. Proenza, 2019

It now sorts those images by their classification (assuming the segment with the largest area is the appropriate classification)
Further edited by Attack-On-SOEN Concordia Capstone Team, 2021
'''

import os.path
import argparse
import json
from PIL import Image
import requests
from io import BytesIO
import sys

parser = argparse.ArgumentParser(description='')
parser.add_argument('--dataset_path', required=False, default= './data/annotations_unofficial.json', help='Path to annotations')
args = parser.parse_args()

dataset_dir = os.path.dirname(args.dataset_path)

print('Note. If for any reason the connection is broken. Just call me again and I will start where I left.')

# Load annotations
with open(args.dataset_path, 'r') as f:
    file = json.loads(f.read())

    nr_images = len(file['images'])
    print(str(nr_images) + " images...")
    nr_annotations = len(file['annotations'])

    for i in range(nr_images):

        image = file['images'][i]
        areas = dict()

        for j in range(nr_annotations):
            annotation = file['annotations'][j]
            if annotation['image_id'] == image['id']:
                if annotation['category_id'] in areas.keys():
                    areas[annotation['category_id']] += annotation['area']
                else:
                    areas[annotation['category_id']] = annotation['area']
        
        category = max(areas, key=areas.get)

        file_name = image['file_name'].split('/')[1]
        url_original = image['flickr_url']

        file_path = os.path.join(dataset_dir + '/train/', str(category) + '/', file_name)

        # Create subdir if necessary
        subdir = os.path.dirname(file_path)
        if not os.path.isdir(subdir):
            os.mkdir(subdir)

        if not os.path.isfile(file_path):
            # Load and Save Image
            response = requests.get(url_original)
            img = Image.open(BytesIO(response.content))
            if img._getexif():
                img.save(file_path, exif=img.info["exif"])
            else:
                img.save(file_path)

        # Show loading bar
        bar_size = 30
        x = int(bar_size * i / nr_images)
        sys.stdout.write("%s[%s%s] - %i/%i\r" % ('Loading: ', "=" * x, "." * (bar_size - x), i, nr_images))
        sys.stdout.flush()

    sys.stdout.write('Finished\n')
