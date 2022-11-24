from django.contrib.auth import get_user_model
from rest_framework.response import Response
from .serializers import ProfileSerializer, ProfileImageSerializer
from rest_framework.decorators import api_view
from rest_framework import status


# Create your views here.
@api_view(['GET', 'DELETE', ])
def profile(request, nickname):
    user = get_user_model().objects.get(nickname=nickname)

    if request.method == 'GET':
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        if request.user == user:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['PATCH'])
def profile_image_change(request, nickname):
    user = get_user_model().objects.get(nickname=nickname)
    serializer = ProfileImageSerializer(user, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


# @api_view(['POST',])
# def signout(request):
#     request.user.auth_token.delete()
#     return Response(status=204)