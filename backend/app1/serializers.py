from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Service
from rest_framework_simplejwt.tokens import RefreshToken

def get_image_url(request, image_field):
    if image_field and hasattr(image_field, 'url'):
        return request.build_absolute_uri(image_field.url)
    return None

class ServiceListSerializer(serializers.ModelSerializer):
    sample_image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id',
            'service_name',
            'description',
            'rating',
            'sample_image',
        ]

    def get_sample_image(self, obj):
        request = self.context.get('request')
        return get_image_url(request, obj.sample_image)

class ServiceDetailSerializer(serializers.ModelSerializer):
    name_of_the_expert = serializers.SerializerMethodField()
    sample_image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id',
            'service_name',
            'description',
            'rating',
            'price',
            'duration_of_service',
            'sample_image',
            'name_of_the_expert',
        ]

    def get_sample_image(self, obj):
        request = self.context.get('request')
        return get_image_url(request, obj.sample_image)

    def get_name_of_the_expert(self, obj):
        if obj.expert:
            return f"{obj.expert.first_name} {obj.expert.last_name}"
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
