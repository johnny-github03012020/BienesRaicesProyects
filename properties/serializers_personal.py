from rest_framework import serializers
from .models import Personal

class PersonalSerializer(serializers.ModelSerializer):
    foto_url = serializers.SerializerMethodField()
    nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Personal
        fields = [
            'id', 'nombre', 'apellido', 'nombre_completo', 'cargo',
            'descripcion', 'foto', 'foto_url', 'email',
            'linkedin', 'twitter', 'facebook', 'instagram',
            'orden', 'activo', 'created_at', 'updated_at'
        ]
    
    def get_foto_url(self, obj):
        if obj.foto:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.foto.url)
            return obj.foto.url
        return None
    
    def get_nombre_completo(self, obj):
        return f"{obj.nombre} {obj.apellido}"
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation.get('foto_url') and representation.get('foto'):
            representation['foto_url'] = representation['foto']
        return representation