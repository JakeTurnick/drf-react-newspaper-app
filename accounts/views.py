from django.shortcuts import render
from rest_framework import generics
from .models import Profile
from .serializer import ProfileSerializer

# Create your views here.


class UsersAPIView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class UserDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.kwargs['user']
        return Profile.objects.filter(username=user)
