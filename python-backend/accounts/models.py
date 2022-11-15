from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    prefer_movies = models.ManyToManyField('movies.Movie', related_name='prefer_users')