// Remove unused imports and variables
// import { Link } from 'react-router-dom';
// Remove storeRedirectPath and redirectToLogin if they're not used
// Remove config and systemStatus variables if they're not used
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/authService';
import propertyService from '../services/propertyService';
import '../styles/PropertyForm.css';

const PropertyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    image: null,
    featured: false
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAdmin = async () => {
      const isAdmin = await isAdminUser();
      if (!isAdmin) {
        navigate('/');
        return;
      }
      
      // Cargar los datos de la propiedad
      try {
        const propertyData = await propertyService.getPropertyById(id);
        setProperty({
          ...propertyData,
          price: propertyData.price.toString()
        });
        if (propertyData.image) {
          setImagePreview(propertyData.image);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('No se pudo cargar la propiedad. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setProperty({
        ...property,
        [name]: files[0]
      });
      
      // Crear una vista previa de la imagen
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
      // Crear un FormData para enviar la imagen
      const formData = new FormData();
      for (const key in property) {
        if (key === 'image' && property[key] instanceof File) {
          formData.append(key, property[key]);
        } else if (property[key] !== null) {
          formData.append(key, property[key]);
        }
      }
      
      await propertyService.updateProperty(id, formData);
      navigate('/admin/properties');
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Error al actualizar la propiedad. Por favor, intente de nuevo.');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="property-form-container">
      <h1>Editar Propiedad</h1>
      
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
          <label htmlFor="image">Imagen</label>
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
            onClick={() => navigate('/admin/properties')}
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
            {formSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyEdit;