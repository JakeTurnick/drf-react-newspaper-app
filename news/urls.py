from django.urls import path, include
from .views import AllListAPIView, CatePostListAPIView, PostDetailAPIView, PublishedListAPIView, SubmittedListAPIView, DraftListAPIView

urlpatterns = [
    path('posts/<int:pk>/', PostDetailAPIView.as_view()),
    path('posts/drafts/', DraftListAPIView.as_view()),
    path('posts/submitted/', SubmittedListAPIView.as_view()),
    path('posts/<str:cate>/', CatePostListAPIView.as_view()),
    path('posts/', PublishedListAPIView.as_view()),
]
