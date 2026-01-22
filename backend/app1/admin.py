from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        'service_name',
        'expert',
        'price',
        'rating',
        'duration_of_service',
    )
    search_fields = ('service_name', 'expert__username')
    list_filter = ('rating',)
