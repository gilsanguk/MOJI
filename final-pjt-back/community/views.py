from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import (
    ReviewListSerializer,
    ReviewSerializer,
    CommentListSerializer,
    CommentSerializer,
)
from .models import Review, Comment
from movies.models import Movie

# Create your views here.
@api_view(['GET',])
def review_list(request, movie_pk):
    if Movie.objects.filter(pk=movie_pk).exists():
        reviews = Review.objects.filter(movie_id=movie_pk).order_by('-created_at')
        serializers = ReviewListSerializer(reviews, many=True)
        return Response(serializers.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST',])
def create_review(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def review_detail(request, movie_pk, review_pk):
    if not Movie.objects.filter(pk=movie_pk).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

        
@api_view(['POST',])
def like_review(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'POST':
        if review.like_users.filter(pk=request.user.pk).exists():
            review.like_users.remove(request.user)
        else:
            review.like_users.add(request.user)
        context = {
            'like_count': review.like_users.count(),
            'is_liked': review.like_users.filter(pk=request.user.pk).exists(),
        }
        return Response(context)
        

@api_view(['GET',])
def comment_list(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    comments = review.comment_set.order_by('-created_at')
    serializer = CommentListSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST',])
def create_comment(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(review=review, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, review_pk, comment_pk):
    if not Review.objects.filter(pk=review_pk).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        

@api_view(['POST',])
def like_comment(request, review_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'POST':
        if comment.like_users.filter(pk=request.user.pk).exists():
            comment.like_users.remove(request.user)
        else:
            comment.like_users.add(request.user)
        context = {
            'like_count': comment.like_users.count(),
            'is_liked': comment.like_users.filter(pk=request.user.pk).exists(),
        }
        return Response(context)