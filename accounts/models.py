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

    def __str__(self):
        return self.user.username

    def get_admin_status(self):
        if self.is_staff:
            return True
        elif self.is_superuser:
            return True
        else:
            return False


# class Org(models.Model):
#     members = models.ManyToManyField
