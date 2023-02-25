from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Post
from .serializers import PostSerializer, CateSerializer
# from .permissions import isAuthorOrReadOnly, isPublisher


# Create your views here.
class AllListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)


class PostDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(pk=pk)


class PublishedListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)


class SubmittedListAPIView(generics.ListAPIView):
    queryset = Post.objects.filter(is_submitted=True)
    serializer_class = PostSerializer
    permission_classes = (IsAdminUser,)


class DraftListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user, is_submitted=False, is_published=False)


class CatePostListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        cate = self.kwargs['cate'].capitalize()
        return Post.objects.filter(category=cate)


class PublishedListAPIView(generics.ListAPIView):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)


# class AuthorPostsAPIView(generics.ListCreateAPIView):
#     serializer_class = PostSerializer
#     permission_classes = (isAuthorOrReadOnly)

#     def get_queryset(self):
#         return Post.objects.filter()
