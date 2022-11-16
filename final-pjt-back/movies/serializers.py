from rest_framework import serializers
from .models import Actor, Movie


class MovieTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title']


class ActorNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['name']


class ActorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = ['id', 'name']


class ActorSerializer(serializers.ModelSerializer):
    movies = MovieTitleSerializer(many=True, read_only=True)

    class Meta:
        model = Actor
        fields = '__all__'


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ['title', 'overview']


class MovieSerializer(serializers.ModelSerializer):
    actors = ActorNameSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = '__all__'



