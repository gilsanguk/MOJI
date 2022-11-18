from django.urls import path
from . import views_tmdb
from . import views

app_name = 'movies'
urlpatterns = [
    path('tmdb/', views_tmdb.tmdb_data),
    
    path('', views.index, name='index'),

    path('recommend/', views.recommend_movie_list),
    path('liked/', views.liked_movie_list),
    path('recent/', views.recent_movie_list),
    path('random_genre/', views.random_genre_movie_list),
    
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.like_movie),
]