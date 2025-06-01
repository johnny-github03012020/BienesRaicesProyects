from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def property_list(request):
    if request.method == 'GET':
        return Response({'message': 'Lista de propiedades'}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        return Response({'message': 'Propiedad creada'}, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def property_detail(request, pk):
    if request.method == 'GET':
        return Response({'message': f'Detalle de propiedad {pk}'}, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        return Response({'message': f'Propiedad {pk} actualizada'}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        return Response({'message': f'Propiedad {pk} eliminada'}, status=status.HTTP_204_NO_CONTENT)
