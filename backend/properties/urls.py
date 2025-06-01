from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import PropertyViewSet

router = DefaultRouter()
router.register('properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]