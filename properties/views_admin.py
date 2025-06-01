from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.contrib import messages
from .models_admin import Property, Advertisement, PageTemplate

def is_admin(user):
    return user.is_authenticated and user.is_staff

class AdminRequiredMixin(UserPassesTestMixin):
    def test_func(self):
        return is_admin(self.request.user)

@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    properties_count = Property.objects.count()
    active_ads = Advertisement.objects.filter(is_active=True).count()
    templates_count = PageTemplate.objects.count()
    
    context = {
        'properties_count': properties_count,
        'active_ads': active_ads,
        'templates_count': templates_count
    }
    return render(request, 'admin/dashboard.html', context)

class PropertyListView(AdminRequiredMixin, ListView):
    model = Property
    template_name = 'admin/property_list.html'
    context_object_name = 'properties'
    ordering = ['-created_at']

class PropertyCreateView(AdminRequiredMixin, CreateView):
    model = Property
    template_name = 'admin/property_form.html'
    fields = ['title', 'description', 'price', 'location', 'property_type', 'area', 'bedrooms', 'bathrooms', 'is_featured']
    success_url = reverse_lazy('admin-properties')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        messages.success(self.request, 'Propiedad creada exitosamente')
        return super().form_valid(form)

class PropertyUpdateView(AdminRequiredMixin, UpdateView):
    model = Property
    template_name = 'admin/property_form.html'
    fields = ['title', 'description', 'price', 'location', 'property_type', 'area', 'bedrooms', 'bathrooms', 'is_featured']
    success_url = reverse_lazy('admin-properties')

    def form_valid(self, form):
        messages.success(self.request, 'Propiedad actualizada exitosamente')
        return super().form_valid(form)

class PropertyDeleteView(AdminRequiredMixin, DeleteView):
    model = Property
    template_name = 'admin/property_confirm_delete.html'
    success_url = reverse_lazy('admin-properties')
    
    def delete(self, request, *args, **kwargs):
        messages.success(request, 'Propiedad eliminada exitosamente')
        return super().delete(request, *args, **kwargs)

class AdvertisementListView(AdminRequiredMixin, ListView):
    model = Advertisement
    template_name = 'admin/advertisement_list.html'
    context_object_name = 'advertisements'
    ordering = ['-created_at']

class AdvertisementCreateView(AdminRequiredMixin, CreateView):
    model = Advertisement
    template_name = 'admin/advertisement_form.html'
    fields = ['title', 'description', 'image', 'url', 'position', 'is_active', 'start_date', 'end_date']
    success_url = reverse_lazy('admin-advertisements')

    def form_valid(self, form):
        messages.success(self.request, 'Anuncio creado exitosamente')
        return super().form_valid(form)

class PageTemplateListView(AdminRequiredMixin, ListView):
    model = PageTemplate
    template_name = 'admin/page_template_list.html'
    context_object_name = 'templates'
    ordering = ['name']

class PageTemplateCreateView(AdminRequiredMixin, CreateView):
    model = PageTemplate
    template_name = 'admin/page_template_form.html'
    fields = ['name', 'slug', 'content', 'meta_title', 'meta_description', 'is_active']
    success_url = reverse_lazy('admin-templates')

    def form_valid(self, form):
        form.instance.modified_by = self.request.user
        messages.success(self.request, 'Plantilla creada exitosamente')
        return super().form_valid(form)