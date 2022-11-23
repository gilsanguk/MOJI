from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

# Create your models here.
class User(AbstractUser):
    nickname = models.CharField(max_length=20, unique=True)
    profile_image = ProcessedImageField(
        upload_to='profile_images',
        processors=[ResizeToFill(300, 300)],
        format='JPEG',
        options={'quality': 90},
    )

    prefer_movies = models.ManyToManyField('movies.Movie', related_name='prefer_users')