from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/services/', views.list_services),
    path('api/service/<int:pk>/', views.service_detail),

    path('api/users/', views.list_users),
    path('api/users/profile/', views.user_profile),

    path('api/users/login/', TokenObtainPairView.as_view()),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)