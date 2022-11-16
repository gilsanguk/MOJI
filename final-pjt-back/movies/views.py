from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import (
    MovieListSerializer,
    MovieSerializer,
)
from .models import Movie


@api_view(['GET',])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializers = MovieListSerializer(movies, many=True)
    for movie in serializers.data:
        if not movie.get('poster_path'):
            movie['poster_path'] = 'https://www.movienewz.com/img/films/poster-holder.jpg'
        else:
            movie['poster_path'] = 'https://image.tmdb.org/t/p/original' + movie['poster_path']
    return Response(serializers.data)


@api_view(['GET',])
def movie_detail(request, movie_pk):
    print('!!!!!')
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    if not serializer.data.get('poster_path'):
        serializer.data['poster_path'] = 'https://www.movienewz.com/img/films/poster-holder.jpg'
    else:
        serializer.data['poster_path'] = 'https://image.tmdb.org/t/p/original' + serializer.data['poster_path']
        print(serializer.data)
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