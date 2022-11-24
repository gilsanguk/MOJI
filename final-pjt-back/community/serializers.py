from rest_framework import serializers
from .models import Review, Comment
from accounts.serializers import ProfileSerializer


class ReviewListSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()

    class Meta:
        model = Review
        fields = ('id', 'title', 'content', 'created_at', 'updated_at', 'movie', 'user', 'like_users', 'rank', 'comment_set')


class ReviewSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'movie', 'like_users',)


class CommentSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)
    review = ReviewSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at', 'updated_at', 'user', 'review',)