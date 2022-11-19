from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import (
    MovieListSerializer,
    MovieSerializer,
)
from .models import Movie, Genre
import random
import datetime
import sqlite3
from sklearn.preprocessing import normalize
import base64
import numpy as np
import faiss

def row_to_numpy(row):
    vector_str = row[2]
    vector = np.frombuffer(base64.b64decode(vector_str), dtype=np.float32)
    return vector
    
def get_recomandation(requestes_ids):
    requested_indices = [id_to_index[movie_id] for movie_id in requestes_ids]
    requested_indices_set = set(requested_indices)
    
    D, I = index.search(xb_norm[requested_indices], 100)
    found_movies = []
    for D_row, I_row in zip(D,I):
        for distance, idx in zip(D_row, I_row):
            if distance < 0.1 and idx not in requested_indices_set:
                found_movies.append((distance, idx))
    found_movies = sorted(found_movies, key=lambda x: x[0])
    founded_index_set = set()
    result_indices = []
    
    for _, idx in found_movies:
        if idx not in founded_index_set:
            result_indices.append(idx)
            founded_index_set.add(idx)
    return [data[idx][0] for idx in result_indices]

con = sqlite3.connect("db.sqlite3")
cur = con.cursor()
res = cur.execute("SELECT id, overview, vector, title FROM movies_movie")
data = list(res)
xb = np.array([row_to_numpy(row) for row in data])
xb_norm = normalize(xb, axis=1, norm='l2')
id_to_index = {row[0]: i for i, row in enumerate(data)}

index = faiss.IndexFlatL2(768)
index.add(xb_norm)


@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET',])
def recommend_movie_list(request):
    movies = get_list_or_404(Movie)[:10]
    user = request.user
    prefer_movies = user.prefer_movies.all()
    if prefer_movies:
        prefer_movies_ids = [movie.id for movie in prefer_movies]
        recommend_movies_ids = get_recomandation(prefer_movies_ids)
        movies = Movie.objects.filter(id__in=recommend_movies_ids)
    else:
        movies = Movie.objects.all()[:10]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET',])
def liked_movie_list(request):
    movies = request.user.like_movies.all()
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data or [])


@api_view(['GET',])
def recent_movie_list(request):
    recent_movies = get_list_or_404(
        Movie.objects.filter(release_date__lte=datetime.datetime.now()).order_by('-release_date'))[:30]
    serializers = MovieListSerializer(recent_movies, many=True)
    return Response(serializers.data)


@api_view(['GET',])
def random_genre_movie_list(request):
    genres = get_list_or_404(Genre)
    genre = random.choice(genres)
    movies = Movie.objects.filter(genres=genre)[:30]
    serializers = MovieListSerializer(movies, many=True)
    return Response([serializers.data, genre.name])


@api_view(['GET',])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def reset_prefer(request):
    user = request.user
    user.prefer_movies.clear()
    for movie in request.data.get('movies'):
        user.prefer_movies.add(movie.get('id'))
    return Response(status=status.HTTP_200_OK)


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