from django.urls import path, include

urlpatterns = [
    path('', include('news.urls')),
    path('users/', include('accounts.urls'))
]
