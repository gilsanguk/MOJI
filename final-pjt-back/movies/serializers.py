from rest_framework import serializers
from .models import Movie


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ['title', 'overview', 'poster_path', 'vote_average', 'id']


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

