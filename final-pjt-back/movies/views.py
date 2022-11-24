from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from movies.serializers import (
    MovieAllListSerializer,
    MovieListSerializer,
    MovieSerializer,
)
from movies.models import Movie, Genre
from django.views.decorators.cache import cache_page

import random
import datetime

@api_view(['GET'])
@cache_page(60 * 60 * 24)
def movie_list(request):
    movies = Movie.objects.all()
    serializer = MovieAllListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def recommend_movie_list(request):
    user = request.user
    prefer_movies = user.prefer_movies.all()
    if prefer_movies:
        prefer_movies_ids = [movie.id for movie in prefer_movies]
        recommend_movies_ids = get_recomandation(prefer_movies_ids)
        movies = Movie.objects.filter(id__in=recommend_movies_ids)
    else:
        movies = {}
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
@cache_page(60 * 60 * 24)
def recommend_movie(request, movie_pk):
    recommend_movies_ids = get_recomandation([movie_pk])
    movies = Movie.objects.filter(id__in=recommend_movies_ids)[:36]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def liked_movie_list(request):
    user = request.user
    movies = user.like_movies.all()
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def recent_movie_list(request):
    movies = Movie.objects.filter(release_date__lte=datetime.datetime.now()).order_by('-release_date')[:30]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def random_genre_movie_list(request):
    genres = get_list_or_404(Genre)
    genre = random.choice(genres)
    movies = Movie.objects.filter(genres=genre)[:30]
    serializers = MovieListSerializer(movies, many=True)
    return Response([serializers.data, genre.name])


@api_view(['GET',])
def prefer_movie_list(request):
    user = request.user
    prefer_movies = user.prefer_movies.all()
    serializer = MovieListSerializer(prefer_movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST',])
def reset_prefer(request):
    user = request.user
    user.prefer_movies.clear()
    for movie in request.data.get('movies'):
        user.prefer_movies.add(movie.get('id'))
    return Response(status=status.HTTP_200_OK)


@api_view(['POST',])
def like_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.like_users.filter(pk=request.user.pk).exists():
        movie.like_users.remove(request.user)
        if request.user.prefer_movies.filter(pk=movie_pk).exists():
            request.user.prefer_movies.remove(movie)
    else:
        movie.like_users.add(request.user)
        if not request.user.prefer_movies.filter(pk=movie.pk).exists():
            request.user.prefer_movies.add(movie)
        if request.user.prefer_movies.count() > 10:
            request.user.prefer_movies.remove(request.user.prefer_movies.first())
    context = {
        'like_count': movie.like_users.count(),
        'is_liked': movie.like_users.filter(pk=request.user.pk).exists(),
    }
    return Response(context)