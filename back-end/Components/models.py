from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category_sample_image = models.ImageField(
        null=True, blank=True, upload_to=settings.CATEGORY_IMG_PATH)


class DWUser(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    nbr_of_images = models.IntegerField()


class Building(models.Model):
    building_name = models.CharField(max_length=200)


class Building_images(models.Model):
    buildling = models.ForeignKey(
        Building, on_delete=models.CASCADE, default=1)
    building_image = models.ImageField(
        null=True, blank=True, upload_to=settings.BUILDING_IMG_PATH)


class Bin(models.Model):
    # CATEGORIES WILL NEED TO BE CHANGED WITH MORE INFO
    CATEGORY1 = 'C1'
    CATEGORY2 = 'C2'
    CATEGORY3 = 'C3'
    WASTE_CATEGORY_CHOICES = [
        (CATEGORY1, 'Category1'),
        (CATEGORY2, 'Category2'),
        (CATEGORY3, 'Category3'),
    ]

    building_id = models.ForeignKey(
        Building, on_delete=models.CASCADE, default=1)
    address = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=6, decimal_places=6)
    longitude = models.DecimalField(max_digits=6, decimal_places=6)
    floor_num = models.IntegerField()
    location_description = models.TextField()
    accepted_categories = models.CharField(
        max_length=30, blank=True, null=True, choices=WASTE_CATEGORY_CHOICES)


class Bin_images(models.Model):
    bin_id = models.ForeignKey(Bin, on_delete=models.CASCADE, default=1)
    bin_images = models.ImageField(
        null=True, blank=True, upload_to=settings.BIN_IMG_PATH)


class Trash_Accepted(models.Model):
    name = models.ForeignKey(
        Category, to_field='name', on_delete=models.CASCADE)
    accepted_image = models.ImageField(
        null=True, blank=True, upload_to=settings.ACCEPTED_TRASH_IMG_PATH)
