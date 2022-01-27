"""back_end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from Components.views import (
    ImageRecognitionApiView,
    ImageSubmissionApiView,
    UpdateApiView,
    CreateUser,
    AuthenticateUser,
    UpdatePassword,
    DeleteUser,
    UpdateUsernameAndEmail,
    ResetPassword,
)
import os

from django.conf import settings
from django.views.static import serve

urlpatterns = [
    # Remove admin endpoint for PROD when running in prod
    path('admin/', admin.site.urls) if (os.getenv('PROD_MODE', 'False').title() == 'True') else None,
    path('prediction', ImageRecognitionApiView.as_view()),
    path('image-submission', ImageSubmissionApiView.as_view()),
    path('update', UpdateApiView.as_view()),
    path('create-user', CreateUser.as_view()),
    path('authenticate-user', AuthenticateUser.as_view()),
    path('update-password', UpdatePassword.as_view()),
    path('delete-user', DeleteUser.as_view()),
    path('update-username-email', UpdateUsernameAndEmail.as_view()),
    path('reset-password', ResetPassword.as_view())
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT
        })
    ]
