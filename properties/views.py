from django.shortcuts import render, get_object_or_404
from .models import Property
from django.db.models.query import QuerySet

def property_list(request):
    properties: QuerySet[Property] = Property.objects.all()
    if request.GET.get('is_active'):
        properties = properties.filter(is_active=True)
    
    context = {
        'properties': properties,
    }
    return render(request, 'properties/property_list.html', context)

def property_detail(request, pk):
    property_obj = get_object_or_404(Property, pk=pk)
    context = {
        'property': property_obj
    }
    return render(request, 'properties/property_detail.html', context)
