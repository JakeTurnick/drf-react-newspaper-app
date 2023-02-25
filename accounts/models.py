from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    display_name: models.CharField(max_length=255)
    avatar: models.ImageField(upload_to='profiles/')


# class Org(models.Model):
#     members = models.ManyToManyField
