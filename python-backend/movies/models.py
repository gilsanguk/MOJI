from django.db import models
from django.conf import settings

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100)

class Actor(models.Model):
    name = models.CharField(max_length=50)

class Director(models.Model):
    name = models.CharField(max_length=50)


class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    youtube_key = models.CharField(max_length=100)
    actors = models.ManyToManyField(Actor, related_name='actors')
    directors = models.ManyToManyField(Director, related_name='directors')
    genres = models.ManyToManyField(Genre, related_name='movies')
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')


class MovieEnglish(models.Model):
    title = models.CharField(max_length=100)
    overview = models.TextField()