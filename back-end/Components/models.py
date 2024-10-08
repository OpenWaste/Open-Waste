from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class CategoryInstructions(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, default=1)
    instructions = models.TextField()


class DWUser(AbstractUser):
    email = models.EmailField(blank=False, unique=True)
    profile_picture = models.ImageField(
        null=True, blank=True, upload_to=settings.PROFILE_PICTURE_PATH)
    passcode = models.CharField(max_length=8, blank=True)

    def __str__(self):
        return self.username


class Building(models.Model):
    building_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=15, decimal_places=10)
    longitude = models.DecimalField(max_digits=15, decimal_places=10)

    def __str__(self):
        return self.building_name


class BuildingImages(models.Model):
    building = models.ForeignKey(
        Building, on_delete=models.CASCADE)
    building_images = models.ImageField(
        null=True, blank=True, upload_to=settings.BUILDING_IMG_PATH)

    def __str__(self):
        return f"Image of {self.building}"


class Bin(models.Model):
    building = models.ForeignKey(
        Building, on_delete=models.CASCADE, default=1)
    location_name = models.CharField(max_length=200)
    floor_number = models.IntegerField()
    room_number = models.CharField(max_length=200)
    disposal_type = models.CharField(max_length=200)
    # `accepted_categories` are stored as a string in the form of "<category-1>;<category-2>",
    # separating names with semicolons
    accepted_categories = models.CharField(
        max_length=200, blank=True, null=True)

    def __str__(self):
        return f"Bin located in {self.building} building"


class BinImages(models.Model):
    bin = models.ForeignKey(Bin, on_delete=models.CASCADE, default=1)
    bin_images = models.ImageField(
        null=True, blank=True, upload_to=settings.BIN_IMG_PATH)
    floor_images = models.ImageField(
        null=True, blank=True, upload_to=settings.FLOOR_IMG_PATH)

    def __str__(self):
        return f"Bin {self.bin_id} image"


class ImageSubmission(models.Model):
    category = models.ForeignKey(
        Category, to_field='name', on_delete=models.CASCADE, default=1)
    submission_Image = models.ImageField(
        null=True, blank=True, upload_to=settings.IMAGE_SUBMISSION_PATH)
    is_accepted = models.BooleanField(default=False)
    submitted_by = models.ForeignKey(
        DWUser, on_delete=models.CASCADE, default=1,  null=True)
