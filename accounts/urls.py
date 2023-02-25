from .views import UserDetailAPIView, UsersAPIView
from django.urls import path

urlpatterns = [
    path("<str:user>/", UserDetailAPIView.as_view()),
    path("all/", UsersAPIView.as_view()),
]
