from django.db import models
from django.contrib.auth.models import User
import os
import random

def upload_image_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{random.randint(1000, 999999)}.{ext}"
    return f"services/{new_filename}"

class Service(models.Model):
    service_name = models.CharField(max_length=200)
    description = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    duration_of_service = models.CharField(max_length=100)
    sample_image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    expert = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.service_name
