from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .models import Property
from .serializers import PropertySerializer
import logging

logger = logging.getLogger(__name__)

class PropertyFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')
    location = filters.CharFilter(field_name='location', lookup_expr='icontains')

    class Meta:
        model = Property
        fields = ['property_type', 'operation_type', 'min_price', 'max_price', 'location']

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PropertyFilter
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        logger.info(f'Creating new property by user: {self.request.user}')
        serializer.save()

    def perform_update(self, serializer):
        logger.info(f'Updating property {serializer.instance.id} by user: {self.request.user}')
        serializer.save()

    def perform_destroy(self, instance):
        logger.info(f'Deleting property {instance.id} by user: {self.request.user}')
        instance.delete()

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_properties = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_properties, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def handle_exception(self, exc):
        logger.error(f'Error in PropertyViewSet: {str(exc)}')
        return super().handle_exception(exc)