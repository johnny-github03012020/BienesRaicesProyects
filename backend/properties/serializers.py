from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFeature

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_main', 'alt_text']

class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ['id', 'name']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    features = PropertyFeatureSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'slug', 'description', 'price',
            'operation_type', 'property_type', 'location', 'address',
            'bedrooms', 'bathrooms', 'area', 'featured_image',
            'created_at', 'updated_at', 'is_active', 'is_featured',
            'images', 'features'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError('El precio debe ser mayor que cero.')
        return value

    def validate_area(self, value):
        if value <= 0:
            raise serializers.ValidationError('El área debe ser mayor que cero.')
        return value