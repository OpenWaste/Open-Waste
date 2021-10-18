'''
ONLY RUN ONCE, MOVES 30% OF TRAINING DATA TO VALIDATION DATA FOLDER WITHOUT CHECKING

!!!DANGEROUS FILE!!!

'''
import os
import math

train_path = 'utils/data/train/'
val_path = 'utils/data/val/'

for class_folder in os.listdir(train_path):
    class_images = os.listdir(train_path + str(class_folder))
    for i in range(math.floor(len(class_images)*0.3)):
        os.rename(train_path + class_folder + '/' + class_images[i], val_path + class_folder + '/' + class_images[i])