from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Personal
from .serializers_personal import PersonalSerializer

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.filter(activo=True).order_by('orden', 'apellido', 'nombre')
    serializer_class = PersonalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Personal.objects.filter(activo=True)
        return queryset.order_by('orden', 'apellido', 'nombre')