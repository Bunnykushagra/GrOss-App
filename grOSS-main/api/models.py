from django.db import models

# Create your models here.

class Search(models.Model):
    search_query = models.CharField(max_length=100)

    def __str__(self):
        return title
