from django.urls import path
from . import views_tmdb
from . import views

app_name = 'movies'
urlpatterns = [
    path('tmdb/', views_tmdb.tmdb_data),
]