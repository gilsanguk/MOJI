from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import (
    MovieListSerializer,
    MovieSerializer,
)
from .models import Movie, Genre, Actor, Director
from accounts.models import User
import random


@api_view(['GET'])
def popular_movie_list(request):
    movies = get_list_or_404(Movie)
    filtered_movies = [movie for movie in movies if movie.vote_average >= 7]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def recommend_movie_list(request, username):
    movies = get_list_or_404(Movie)
    # user = get_object_or_404(User, username=username)
    # prefer_movies = user.prefer_movies.all()
    # 버트를 통해 추천받은 영화 리스트
    
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data or [])


@api_view(['GET',])
def liked_movie_list(request):
    if request.user.is_authenticated:
        movies = request.user.like_movies.all()
        serializers = MovieListSerializer(movies, many=True)
        return Response(serializers.data or [])
    return Response([])


@api_view(['GET',])
def recent_movie_list(request):
    recent_movies = get_list_or_404(Movie.objects.order_by('-release_date')[:20])
    serializers = MovieListSerializer(recent_movies, many=True)
    return Response(serializers.data or [])


@api_view(['GET',])
def random_genre_movie_list(request):
    genres = get_list_or_404(Genre)
    genre = random.choice(genres)
    movies = Movie.objects.filter(genres=genre)[:20]
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data or [])


@api_view(['GET',])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['GET',])
def detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def save_prefer(request, datas):
    movies = [Movie.objects.get(pk=data['movie_pk']) for data in datas]
    for movie in movies:
        request.user.prefer_movies.add(movie)
    # 버트를 이용해 추천 영화를 받아온다.

    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def like_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'POST':
        if movie.like_users.filter(pk=request.user.pk).exists():
            movie.like_users.remove(request.user)
        else:
            movie.like_users.add(request.user)
        context = {
            'like_count': movie.like_users.count(),
            'is_liked': movie.like_users.filter(pk=request.user.pk).exists(),
        }
        return Response(context)