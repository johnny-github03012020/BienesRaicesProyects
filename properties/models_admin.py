from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Property(models.Model):
    PROPERTY_TYPES = [
        ('HOUSE', 'Casa'),
        ('APARTMENT', 'Apartamento'),
        ('LAND', 'Terreno'),
        ('COMMERCIAL', 'Comercial'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    bedrooms = models.IntegerField(null=True, blank=True)
    bathrooms = models.IntegerField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Propiedad'
        verbose_name_plural = 'Propiedades'

    def __str__(self):
        return self.title

class Advertisement(models.Model):
    POSITIONS = [
        ('HOME_TOP', 'Inicio - Superior'),
        ('HOME_SIDEBAR', 'Inicio - Lateral'),
        ('LISTING_TOP', 'Listado - Superior'),
        ('PROPERTY_DETAIL', 'Detalle de Propiedad'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='ads/')
    url = models.URLField()
    position = models.CharField(max_length=20, choices=POSITIONS)
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Anuncio'
        verbose_name_plural = 'Anuncios'

    def __str__(self):
        return self.title

class PageTemplate(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    meta_title = models.CharField(max_length=200)
    meta_description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Plantilla de Página'
        verbose_name_plural = 'Plantillas de Páginas'

    def __str__(self):
        return self.name