from django.db import models
from django.contrib.auth.models import User

class Journal(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    strategy = models.CharField(max_length=50, null=True, blank=True)
    instrument = models.CharField(max_length=50, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    entryprice = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    exitprice = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    quantity = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    position = models.CharField(max_length=20, null=True, blank=True)
    winorlose = models.CharField(max_length=20, null=True, blank=True)
    description = models.TextField( null=True, blank=True)
    image = models.FileField(upload_to='journal_images/', null=True, blank=True)

    def __str__(self):
        return self.strategy

