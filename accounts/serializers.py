from rest_framework import serializers
from rest_framework.authtoken.models import Token
from dj_rest_auth.serializers import TokenSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import Profile, User
from dj_rest_auth.serializers import LoginSerializer


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelField):
    pass


class CustomTokenSerializer(TokenSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    is_superuser = serializers.ReadOnlyField(source="user.is_superuser")

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + ('username', 'is_superuser',)

# class CustomRegisterSerializer(RegisterSerializer):
#     def get_token(self, user):
#         token, _ =
