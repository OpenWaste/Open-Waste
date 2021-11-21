from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Category(models.Model):
    name = models.Charfield(maxlength=200)
    sample_image = models.ImageField()


class DWUser(AbstractUser):
    name = models.Charfield(maxlength=200)
    email = models.Emailfield(max_length=254)
    nbr_of_images = models.IntegerField()


class Building(models.Model):
    name = models.Charfield(maxlength=200)
    #TODO images
    #building_image = models.ImageField(stuff in here)


class Bin(models.Model):
    categories_choices = (
        ('Category1', 'Category1'),
        ('Category2', 'Category2'),
        ('Category3', 'Category3'),
    )

    building_id = models.ForeignKey(Building, on_delete=models.CASCADE, default=1)
    address = models.Charfield(maxlength=200)

    #TODO latitude longitude
    # these should be in the buildings, not the bins
    latitude = models.DecimalField(max_digits=6, decimal_places=6)
    longitude = models.DecimalField(max_digits=6, decimal_places=6)
    floor_num = models.IntegerField()
    location_description = models.TextField()
    #TODO images
    #image = models.ImageField(stuff in here)
    accepted_categories = models.Charfield(maxlength=30, blank=True, null=True, choices=categories)


