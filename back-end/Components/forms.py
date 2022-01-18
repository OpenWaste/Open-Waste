from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import DWUser

class DWUserCreationForm(UserCreationForm):
    class Meta:
        model = DWUser
        fields ="__all__"
