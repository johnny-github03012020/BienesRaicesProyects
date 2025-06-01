from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'description', 'price', 'location', 
            'property_type', 'operation_type', 'bedrooms', 'bathrooms', 
            'area', 'is_featured', 'image', 'image_url', 'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Asegurarse de que la URL de la imagen esté disponible incluso si no hay request
        if not representation.get('image_url') and representation.get('image'):
            representation['image_url'] = representation['image']
        return representation