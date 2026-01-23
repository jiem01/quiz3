from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .models import Service
from .serializers import (
    ServiceListSerializer,
    ServiceDetailSerializer,
    UserSerializer,
    UserProfileSerializer
)

@api_view(['GET'])
def list_services(request):
    services = Service.objects.all()
    serializer = ServiceListSerializer(
        services,
        many=True,
        context={'request': request}
    )
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def service_detail(request, pk):
    service = get_object_or_404(Service, pk=pk)
    serializer = ServiceDetailSerializer(
        service,
        context={'request': request}
    )
    return Response(serializer.data)


# USER LIST (Admin + Auth only)
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# USER PROFILE
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)
