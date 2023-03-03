from django.urls import path, include
from .views import AllListAPIView, CatePostListAPIView, PostDetailAPIView, PublishedListAPIView, SubmittedListAPIView, SubmittedRetrieveAPIView, DraftListAPIView, DraftRetrieveAPIView, PostCreateAPIView

urlpatterns = [
    path('posts/drafts/', DraftListAPIView.as_view()),
    path('posts/drafts/<int:pk>/', DraftRetrieveAPIView.as_view()),
    path('posts/submitted/', SubmittedListAPIView.as_view()),
    path('posts/submitted/<int:pk>/', SubmittedRetrieveAPIView.as_view()),
    path('posts/category/<str:cate>/', CatePostListAPIView.as_view()),
    path('posts/new/', PostCreateAPIView.as_view()),
    path('posts/<int:pk>/', PostDetailAPIView.as_view()),
    path('posts/', PublishedListAPIView.as_view()),
]
