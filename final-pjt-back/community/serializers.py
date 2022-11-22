from rest_framework import serializers
from .models import Review
from movies.serializers import MovieListSerializer
from accounts.serializers import UserNameSerializer


class ReviewListSerializer(serializers.ModelSerializer):
    user = UserNameSerializer()

    class Meta:
        model = Review
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'movie', 'user', 'like_users']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserNameSerializer()
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user', 'movie', 'like_users']