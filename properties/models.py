from django.db import models
from django.utils.text import slugify
import os

def property_image_path(instance, filename):
    # Genera un path único para cada imagen de propiedad
    # Format: properties/property_id/filename
    return f'properties/{slugify(instance.title)}/{filename}'

def personal_image_path(instance, filename):
    # Genera un path único para cada imagen del personal
    # Format: personal/nombre_apellido/filename
    return f'personal/{slugify(f"{instance.nombre} {instance.apellido}")}/{filename}'

class Property(models.Model):
    PROPERTY_TYPES = (
        ('House', 'Casa'),
        ('Apartment', 'Apartamento'),
        ('Commercial', 'Comercial'),
        ('Land', 'Terreno'),
    )
    
    OPERATION_TYPES = (
        ('Sale', 'Venta'),
        ('Rent', 'Alquiler'),
        ('Lease', 'Arrendamiento'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES, default='House')
    operation_type = models.CharField(max_length=20, choices=OPERATION_TYPES, default='Sale')
    bedrooms = models.PositiveIntegerField(default=0)
    bathrooms = models.PositiveIntegerField(default=0)
    area = models.PositiveIntegerField(help_text="Área en metros cuadrados")
    is_featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to=property_image_path, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Propiedad"
        verbose_name_plural = "Propiedades"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Si es una nueva propiedad (sin ID), guardamos primero para obtener el ID
        if not self.pk and not self.image:
            super().save(*args, **kwargs)
        
        # Luego guardamos normalmente
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        # Eliminar la imagen del sistema de archivos cuando se elimina la propiedad
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)

class Personal(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cargo = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    foto = models.ImageField(upload_to=personal_image_path)
    email = models.EmailField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    orden = models.PositiveIntegerField(default=0, help_text="Orden de aparición en la página")
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Personal"
        verbose_name_plural = "Personal"
        ordering = ['orden', 'apellido', 'nombre']

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.cargo}"

    def delete(self, *args, **kwargs):
        if self.foto:
            if os.path.isfile(self.foto.path):
                os.remove(self.foto.path)
        super().delete(*args, **kwargs)
