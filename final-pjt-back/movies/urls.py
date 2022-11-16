from django.urls import path
from . import views_tmdb
from . import views

app_name = 'movies'
urlpatterns = [
    path('tmdb/', views_tmdb.tmdb_data),
    path('', views.movie_list),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.like_movie),
]