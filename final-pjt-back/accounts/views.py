from django.contrib.auth import get_user_model
from rest_framework.response import Response
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.
@api_view(['GET',])
@permission_classes([IsAuthenticated])
def profile(request, username):
    user = get_user_model().objects.get(username=username)
    serializer = ProfileSerializer(user)
    return Response(serializer.data)


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def signout(request):
    request.user.auth_token.delete()
    return Response(status=204)