from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.movie_list, name='movie_list'),
    path('recommend/<str:username>/', views.recommend_movie_list),
    path('liked/', views.liked_movie_list),
    path('recent/', views.recent_movie_list),
    path('random_genre/', views.random_genre_movie_list),

    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.like_movie),
    
    path('save_prefer', views.save_prefer),
]