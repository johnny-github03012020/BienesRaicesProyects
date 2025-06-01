from django.urls import path
from . import views_admin

urlpatterns = [
    path('admin/dashboard/', views_admin.admin_dashboard, name='admin-dashboard'),
    
    # URLs para Propiedades
    path('admin/properties/', views_admin.PropertyListView.as_view(), name='admin-properties'),
    path('admin/property/new/', views_admin.PropertyCreateView.as_view(), name='property-create'),
    path('admin/property/<int:pk>/edit/', views_admin.PropertyUpdateView.as_view(), name='property-update'),
    path('admin/property/<int:pk>/delete/', views_admin.PropertyDeleteView.as_view(), name='property-delete'),
    
    # URLs para Anuncios
    path('admin/advertisements/', views_admin.AdvertisementListView.as_view(), name='admin-advertisements'),
    path('admin/advertisement/new/', views_admin.AdvertisementCreateView.as_view(), name='advertisement-create'),
    
    # URLs para Plantillas
    path('admin/templates/', views_admin.PageTemplateListView.as_view(), name='admin-templates'),
    path('admin/template/new/', views_admin.PageTemplateCreateView.as_view(), name='template-create'),
]