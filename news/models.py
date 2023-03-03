from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Post(models.Model):
    # CATEGORIES
    BUSINESS = 'bus'
    GAMING = 'game'
    HEALTH = 'hlth'
    POLITICS = 'pol'
    WORLD = 'wrld'
    # CHOICES
    CATEGORY_CHOICES = [
        (BUSINESS, 'Business'),
        (GAMING, 'Gaming'),
        (HEALTH, 'Health'),
        (POLITICS, 'Politics'),
        (WORLD, 'World'),
    ]

    # MODEL FIELDS
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    category = models.CharField(max_length=4, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=255)
    text = models.TextField()
    is_submitted = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # MODEL METHODS
    def __str__(self):
        return self.category.capitalize() + " | " + ("Title: " + self.title[:100])
