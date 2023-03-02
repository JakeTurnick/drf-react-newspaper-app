from .views import UserDetailAPIView, UsersAPIView
from django.urls import path

urlpatterns = [
    path("all/", UsersAPIView.as_view()),
    path("user/<int:pk>/", UserDetailAPIView.as_view()),
]
