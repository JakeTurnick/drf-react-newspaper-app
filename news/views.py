from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Post
from .serializers import PostSerializer
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
    queryset = Post.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)


class CatePostListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        cate = self.kwargs['cate'].capitalize()
        return Post.objects.filter(category=cate)


class SubmittedListAPIView(generics.ListAPIView):
    queryset = Post.objects.filter(is_submitted=True, is_published=False)
    serializer_class = PostSerializer
    permission_classes = (IsAdminUser,)


class SubmittedRetrieveAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return Post.objects.filter(is_submitted=True, is_published=False)


class DraftListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        if (self.request.user.is_superuser == True):
            return Post.objects.filter(is_published=False)
        else:
            return Post.objects.filter(author=self.request.user, is_submitted=False, is_published=False)


class DraftRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        if (self.request.user.is_superuser == True):
            return Post.objects.filter(pk=pk, is_published=False)
        else:
            return Post.objects.filter(pk=pk, author=self.request.user, is_submitted=False, is_published=False)


# class SubmittedListAPIView(generics.ListAPIView):
#     serializer_class = PostSerializer

#     def get_queryset(self):
#         if (self.request.user.is_superuser == True):
#             return Post.objects.filter(is_published=False)
#         else:
#             return Post.objects.filter(author=self.request.user, is_submitted=True, is_published=False)


# class SubmittedRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = PostSerializer

#     def get_queryset(self):
#         pk = self.kwargs['pk']
#         if (self.request.user.is_superuser == True):
#             return Post.objects.filter(pk=pk, is_published=False)
#         else:
#             return Post.objects.filter(pk=pk, author=self.request.user, is_submitted=True, is_published=False)

    # class AuthorPostsAPIView(generics.ListCreateAPIView):
    #     serializer_class = PostSerializer
    #     permission_classes = (isAuthorOrReadOnly)

    #     def get_queryset(self):
    #         return Post.objects.filter()
