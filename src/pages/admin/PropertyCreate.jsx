import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import '../../styles/PropertyForm.css';

const PropertyCreate = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    image: null,
    featured: false,
    pageModel: 'clasico', // Nuevo campo para el modelo de página
    images: [], // Múltiples imágenes para galería
    coordinates: { lat: '', lng: '' } // Coordenadas para el mapa
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setProperty({
        ...property,
        [name]: files[0]
      });
      
      // Create image preview
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (type === 'checkbox') {
      setProperty({
        ...property,
        [name]: checked
      });
    } else {
      setProperty({
        ...property,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError(null);
    
    try {
      // Create FormData to send image
      const formData = new FormData();
      for (const key in property) {
        if (key === 'image' && property[key] instanceof File) {
          formData.append(key, property[key]);
        } else if (property[key] !== null) {
          formData.append(key, property[key]);
        }
      }
      
      await propertyService.createProperty(formData);
      navigate('/admin');
    } catch (err) {
      console.error('Error creating property:', err);
      setError('Error al crear la propiedad. Por favor, intente de nuevo.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="property-form-container">
      <h1>Crear Nueva Propiedad</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={property.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              value={property.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Ubicación</label>
            <input
              type="text"
              id="location"
              name="location"
              value={property.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bedrooms">Habitaciones</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={property.bedrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bathrooms">Baños</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={property.bathrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="area">Área (m²)</label>
            <input
              type="number"
              id="area"
              name="area"
              value={property.area}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="pageModel">Modelo de Página</label>
          <select
            id="pageModel"
            name="pageModel"
            value={property.pageModel}
            onChange={handleChange}
            required
          >
            <option value="clasico">Modelo Clásico</option>
            <option value="galeria">Modelo Galería</option>
            <option value="mapa">Modelo Destacado con Mapa</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen Principal</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Vista previa" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="images">Imágenes Adicionales</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleChange}
            accept="image/*"
            multiple
          />
        </div>

        {property.pageModel === 'mapa' && (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lat">Latitud</label>
              <input
                type="text"
                id="lat"
                name="lat"
                value={property.coordinates.lat}
                onChange={(e) => setProperty({
                  ...property,
                  coordinates: { ...property.coordinates, lat: e.target.value }
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lng">Longitud</label>
              <input
                type="text"
                id="lng"
                name="lng"
                value={property.coordinates.lng}
                onChange={(e) => setProperty({
                  ...property,
                  coordinates: { ...property.coordinates, lng: e.target.value }
                })}
                required
              />
            </div>
          </div>
        )}
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={property.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Destacada</label>
        </div>
        
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="btn-secondary"
            disabled={formSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={formSubmitting}
          >
            {formSubmitting ? 'Creando...' : 'Crear Propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyCreate;