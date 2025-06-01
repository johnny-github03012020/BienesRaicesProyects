from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views_personal import PersonalViewSet

router = DefaultRouter()
router.register(r'personal', PersonalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('properties/', views.property_list, name='property-list'),
    path('properties/<int:pk>/', views.property_detail, name='property-detail'),
]