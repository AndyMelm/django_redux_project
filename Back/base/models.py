from django.db import models
from django.contrib.auth.models import User

class Journal(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    strategy = models.CharField(max_length=50, null=True, blank=True)
    buyprice = models.DecimalField(max_digits=10, decimal_places=2)
    sellprice = models.DecimalField(max_digits=10, decimal_places=2)
    position = models.CharField(max_length=20)
    description = models.TextField()
    image = models.ImageField(upload_to='journal_images/', null=True, blank=True)

    def __str__(self):
        return self.strategy
