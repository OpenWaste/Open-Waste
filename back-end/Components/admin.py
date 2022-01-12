from django.contrib import admin
from .models import *
from .forms import DWUserCreationForm
from django.contrib.auth.admin import UserAdmin

# Register your models here.

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
admin.site.register(Building_images)
admin.site.register(Bin)
admin.site.register(Bin_images)
admin.site.register(CategoryInstructions)
admin.site.register(Image_Submission)
