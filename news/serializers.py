from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Post
        fields = ['id', 'category', 'title', 'text',
                  'author', 'is_submitted', 'is_published', 'username']


class CateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
