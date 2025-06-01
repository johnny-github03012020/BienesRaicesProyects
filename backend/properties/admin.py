from django.contrib import admin
from .models import Property, PropertyImage, PropertyFeature, UserProfile, Inquiry, Favorite

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3

class PropertyFeatureInline(admin.TabularInline):
    model = PropertyFeature
    extra = 3

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'operation_type', 'property_type', 'location', 'bedrooms', 'bathrooms', 'area', 'is_active', 'is_featured')
    list_filter = ('operation_type', 'property_type', 'is_active', 'is_featured', 'created_at')
    search_fields = ('title', 'description', 'location', 'address')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PropertyImageInline, PropertyFeatureInline]
    fieldsets = (
        ('Información básica', {
            'fields': ('title', 'slug', 'description', 'price', 'operation_type', 'property_type')
        }),
        ('Ubicación', {
            'fields': ('location', 'address')
        }),
        ('Características', {
            'fields': ('bedrooms', 'bathrooms', 'area')
        }),
        ('Multimedia', {
            'fields': ('featured_image',)
        }),
        ('Estado', {
            'fields': ('is_active', 'is_featured')
        }),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'is_agent')
    list_filter = ('is_agent',)
    search_fields = ('user__username', 'user__email', 'phone')

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'property', 'status', 'created_at', 'is_read')
    list_filter = ('status', 'is_read', 'created_at')
    search_fields = ('name', 'email', 'message', 'property__title')
    readonly_fields = ('created_at',)

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'property', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'property__title')
