from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('api/services/', views.list_services),
    path('api/service/<int:pk>/', views.service_detail),

    path('api/users/', views.list_users),
    path('api/users/profile/', views.user_profile),

    path('api/users/login/', TokenObtainPairView.as_view()),
]
