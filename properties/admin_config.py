from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User, Group
from .models import Property, Advertisement, PageTemplate

# Configuración del panel de administración
admin.site.site_header = 'Panel de Administración de Bienes Raíces'
admin.site.site_title = 'Administración BR'
admin.site.index_title = 'Panel de Control'

# Personalización del modelo de Usuario
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'groups')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)

# Registro de modelos en el panel de administración
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Configuración para Propiedades
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'location', 'is_featured', 'created_at')
    list_filter = ('is_featured', 'property_type')
    search_fields = ('title', 'description', 'location')
    ordering = ('-created_at',)

# Configuración para Anuncios
@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('title', 'position', 'is_active', 'start_date', 'end_date')
    list_filter = ('is_active', 'position')
    search_fields = ('title', 'description')
    ordering = ('position', '-start_date')

# Configuración para Plantillas de Página
@admin.register(PageTemplate)
class PageTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'last_modified')
    list_filter = ('is_active',)
    search_fields = ('name', 'slug')
    ordering = ('name',)