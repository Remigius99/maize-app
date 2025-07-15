from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Prediction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)  # Add this line
    image = models.ImageField(upload_to='uploads/')
    result = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)

class DiagnosisImage(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='diagnosis_images/')
    result = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
