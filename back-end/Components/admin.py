from django.contrib import admin
from .models import Category, DWUser, Building, BuildingImages, Bin, BinImages, CategoryInstructions, ImageSubmission 
from .forms import DWUserCreationForm
from django.contrib.auth.admin import UserAdmin

# Register your models here.

# content + attributes that will show up for the creation form
class DWUserAdmin(UserAdmin):
    model = DWUser
    add_form = DWUserCreationForm

    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Profile Picture',
            {
                'fields':(
                    'profile_picture',
                )
            }
        )
    )

# admin page can interact with these models
admin.site.register(Category)
admin.site.register(DWUser, DWUserAdmin)
admin.site.register(Building)
admin.site.register(BuildingImages)
admin.site.register(Bin)
admin.site.register(BinImages)
admin.site.register(CategoryInstructions)
admin.site.register(ImageSubmission)
