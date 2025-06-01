from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property
from .serializers import PropertySerializer
import logging

logger = logging.getLogger(__name__)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'created_at']
    filterset_fields = ['property_type', 'operation_type', 'bedrooms', 'bathrooms']
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    def list(self, request, *args, **kwargs):
        try:
            logger.info(f"Listing properties with params: {request.query_params}")
            queryset = self.filter_queryset(self.get_queryset())
            logger.info(f"Found {queryset.count()} properties")
            
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error in list: {str(e)}")
            return Response(
                {"error": "Error al obtener propiedades", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False)
    def featured(self, request):
        try:
            logger.info("Getting featured properties")
            # Primero intentamos obtener propiedades con is_featured=True
            featured = Property.objects.filter(is_featured=True)
            
            # Si no hay propiedades destacadas, devolvemos las primeras 3
            if not featured.exists():
                logger.info("No featured properties found, returning first 3 properties")
                featured = Property.objects.all()[:3]
            else:
                featured = featured[:5]  # Limitamos a 5 propiedades destacadas
                
            logger.info(f"Found {featured.count()} properties to display")
            
            serializer = self.get_serializer(featured, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error in featured: {str(e)}")
            return Response(
                {"error": "Error al obtener propiedades destacadas", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False)
    def search(self, request):
        try:
            logger.info(f"Searching properties with params: {request.query_params}")
            queryset = self.get_queryset()
            
            # Apply filters from query parameters
            property_type = request.query_params.get('property_type')
            if property_type:
                queryset = queryset.filter(property_type=property_type)
                
            operation_type = request.query_params.get('operation_type')
            if operation_type:
                queryset = queryset.filter(operation_type=operation_type)
                
            min_price = request.query_params.get('min_price')
            if min_price:
                queryset = queryset.filter(price__gte=min_price)
                
            max_price = request.query_params.get('max_price')
            if max_price:
                queryset = queryset.filter(price__lte=max_price)
                
            bedrooms = request.query_params.get('bedrooms')
            if bedrooms:
                queryset = queryset.filter(bedrooms__gte=bedrooms)
                
            bathrooms = request.query_params.get('bathrooms')
            if bathrooms:
                queryset = queryset.filter(bathrooms__gte=bathrooms)
                
            location = request.query_params.get('location')
            if location:
                queryset = queryset.filter(location__icontains=location)
            
            logger.info(f"Search found {queryset.count()} properties")
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error in search: {str(e)}")
            return Response(
                {"error": "Error al buscar propiedades", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )