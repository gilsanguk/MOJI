from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User

class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(required=True)
    profile_image = serializers.ImageField(use_url=True, default='static/no_profile.png')

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['nickname'] = self.validated_data.get('nickname', '')
        data['profile_image'] = self.validated_data.get('profile_image', '')
        return data


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'nickname', 'profile_image', 'prefer_movies']


class ProfileImageSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['profile_image'] = self.validated_data.get('profile_image', '')
        return data

    class Meta:
        model = User
        fields = ['profile_image']