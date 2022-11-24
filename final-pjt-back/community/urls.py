from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    path('<int:movie_pk>/reviews/', views.review_list),
    path('<int:movie_pk>/reviews/create/', views.create_review),
    
    path('<int:movie_pk>/reviews/<int:review_pk>/', views.review_detail),
    path('reviews/<int:review_pk>/like/', views.like_review),

    path('reviews/<int:review_pk>/comments/', views.comment_list),
    path('reviews/<int:review_pk>/comments/create/', views.create_comment),
    path('reviews/<int:review_pk>/comments/<int:comment_pk>/', views.comment_detail),
    path('reviews/<int:review_pk>/comments/<int:comment_pk>/like/', views.like_comment),
]