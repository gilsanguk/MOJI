from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.movie_list, name='movie_list'),
    path('recommend/', views.recommend_movie_list),

    path('recent/', views.recent_movie_list),
    path('random_genre/', views.random_genre_movie_list),


    path('recommend/<int:movie_pk>/', views.recommend_movie),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.like_movie),
    
    path('reset/', views.reset_prefer),
]