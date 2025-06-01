from django.contrib import admin
from django.utils.html import format_html
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'property_type', 'operation_type', 'location', 'is_featured', 'display_image')
    list_filter = ('property_type', 'operation_type', 'is_featured')
    search_fields = ('title', 'description', 'location')
    list_editable = ('is_featured',)
    readonly_fields = ('created_at', 'updated_at', 'display_image')
    fieldsets = (
        ('Información Básica', {
            'fields': ('title', 'description', 'price', 'location')
        }),
        ('Características', {
            'fields': ('property_type', 'operation_type', 'bedrooms', 'bathrooms', 'area')
        }),
        ('Opciones', {
            'fields': ('is_featured', 'image', 'display_image')
        }),
        ('Información Temporal', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="75" style="object-fit: cover; border-radius: 5px;" />', obj.image.url)
        return "Sin imagen"
    
    display_image.short_description = 'Vista previa'
