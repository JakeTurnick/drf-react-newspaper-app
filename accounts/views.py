from django.shortcuts import render
from rest_framework import generics
from .models import Profile, User
from .serializers import ProfileSerializer

# Create your views here.


class UsersAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = User.objects.all()


class UserDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.kwargs['pk']
        return Profile.objects.filter(id=user)
