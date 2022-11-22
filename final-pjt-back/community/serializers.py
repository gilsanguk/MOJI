from rest_framework import serializers
from .models import Review


class ReviewListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'user', 'like_users']


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user', 'movie', 'like_users']