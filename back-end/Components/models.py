from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200)
    sample_image = models.ImageField(null=True, blank=True, upload_to='media/sample_images/')


class DWUser(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    nbr_of_images = models.IntegerField()


class Building(models.Model):
    building_name = models.CharField(max_length=200)


class Building_images(models.Model):
    buildling = models.ForeignKey(Building, on_delete=models.CASCADE, default=1)
    building_image = models.ImageField(null=True, blank=True, upload_to='media/building_images/')


class Bin(models.Model):
    categories_choices = (
        ('Category1', 'Category1'),
        ('Category2', 'Category2'),
        ('Category3', 'Category3'),
    )

    building_id = models.ForeignKey(Building, on_delete=models.CASCADE, default=1)
    address = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=6, decimal_places=6)
    longitude = models.DecimalField(max_digits=6, decimal_places=6)
    floor_num = models.IntegerField()
    location_description = models.TextField()
    accepted_categories = models.CharField(max_length=30, blank=True, null=True, choices=categories_choices)


class Bin_images(models.Model):
    bin_id = models.ForeignKey(Bin, on_delete=models.CASCADE, default=1)
    bin_images = models.ImageField(null=True, blank=True, upload_to='media/bin_images/')


