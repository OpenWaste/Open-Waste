from django.contrib import admin
from .models import *

# Register your models here.

# admin page can interact with these models
#admin.site.register(Category)
admin.site.register(DWUser)
admin.site.register(Building)
admin.site.register(Building_images)
admin.site.register(Bin)
admin.site.register(Bin_images)