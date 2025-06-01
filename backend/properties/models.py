from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Property(models.Model):
    """Modelo para las propiedades inmobiliarias"""
    
    OPERATION_TYPES = (
        ('venta', 'Venta'),
        ('alquiler', 'Alquiler'),
        ('arrendamiento', 'Arrendamiento'),
    )
    
    PROPERTY_TYPES = (
        ('casa', 'Casa'),
        ('apartamento', 'Apartamento'),
        ('oficina', 'Oficina'),
        ('local', 'Local Comercial'),
        ('terreno', 'Terreno'),
        ('villa', 'Villa'),
        ('penthouse', 'Penthouse'),
        ('estudio', 'Estudio'),
    )
    
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    description = models.TextField(verbose_name="Descripción")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    operation_type = models.CharField(max_length=20, choices=OPERATION_TYPES, verbose_name="Tipo de operación")
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES, verbose_name="Tipo de propiedad")
    location = models.CharField(max_length=200, verbose_name="Ubicación")
    address = models.CharField(max_length=255, verbose_name="Dirección")
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name="Habitaciones")
    bathrooms = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name="Baños")
    area = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Área (m²)")
    featured_image = models.ImageField(upload_to='properties/', null=True, blank=True, verbose_name="Imagen destacada")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")
    is_active = models.BooleanField(default=True, verbose_name="Activa")
    is_featured = models.BooleanField(default=False, verbose_name="Destacada")
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Propiedad'
        verbose_name_plural = 'Propiedades'
        ordering = ['-created_at']


class PropertyImage(models.Model):
    """Modelo para las imágenes adicionales de las propiedades"""
    
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE, verbose_name="Propiedad")
    image = models.ImageField(upload_to='properties/', verbose_name="Imagen")
    is_main = models.BooleanField(default=False, verbose_name="Imagen principal")
    alt_text = models.CharField(max_length=100, blank=True, verbose_name="Texto alternativo")
    
    def __str__(self):
        return f"Imagen de {self.property.title}"
    
    class Meta:
        verbose_name = 'Imagen de Propiedad'
        verbose_name_plural = 'Imágenes de Propiedades'


class PropertyFeature(models.Model):
    """Modelo para las características de las propiedades"""
    
    property = models.ForeignKey(Property, related_name='features', on_delete=models.CASCADE, verbose_name="Propiedad")
    name = models.CharField(max_length=100, verbose_name="Nombre")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Característica'
        verbose_name_plural = 'Características'


class UserProfile(models.Model):
    """Modelo para extender el usuario de Django con campos adicionales"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name="Usuario")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Teléfono")
    address = models.CharField(max_length=255, blank=True, verbose_name="Dirección")
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True, verbose_name="Imagen de perfil")
    is_agent = models.BooleanField(default=False, verbose_name="Es agente")
    
    def __str__(self):
        return self.user.username
    
    class Meta:
        verbose_name = 'Perfil de Usuario'
        verbose_name_plural = 'Perfiles de Usuarios'


class Inquiry(models.Model):
    """Modelo para las consultas sobre propiedades"""
    
    STATUS_CHOICES = (
        ('pending', 'Pendiente'),
        ('in_progress', 'En proceso'),
        ('resolved', 'Resuelta'),
        ('closed', 'Cerrada'),
    )
    
    property = models.ForeignKey(Property, related_name='inquiries', on_delete=models.CASCADE, verbose_name="Propiedad")
    user = models.ForeignKey(User, related_name='inquiries', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Usuario")
    name = models.CharField(max_length=100, verbose_name="Nombre")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Teléfono")
    message = models.TextField(verbose_name="Mensaje")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="Estado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")
    is_read = models.BooleanField(default=False, verbose_name="Leída")
    
    def __str__(self):
        return f"Consulta de {self.name} sobre {self.property.title}"
    
    class Meta:
        verbose_name = 'Consulta'
        verbose_name_plural = 'Consultas'
        ordering = ['-created_at']


class Favorite(models.Model):
    """Modelo para las propiedades favoritas de los usuarios"""
    
    user = models.ForeignKey(User, related_name='favorites', on_delete=models.CASCADE, verbose_name="Usuario")
    property = models.ForeignKey(Property, related_name='favorited_by', on_delete=models.CASCADE, verbose_name="Propiedad")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    
    def __str__(self):
        return f"{self.user.username} - {self.property.title}"
    
    class Meta:
        verbose_name = 'Favorito'
        verbose_name_plural = 'Favoritos'
        unique_together = ('user', 'property')
