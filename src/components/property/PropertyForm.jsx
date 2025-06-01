import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import '../../assets/styles/PropertyForm.css';

const PropertyForm = ({ property = null, isEdit = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    property_type: 'House',
    operation_type: 'Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    is_featured: false,
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Si estamos editando, cargamos los datos de la propiedad
  useEffect(() => {
    if (isEdit && property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price || '',
        location: property.location || '',
        property_type: property.property_type || 'House',
        operation_type: property.operation_type || 'Sale',
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || 0,
        is_featured: property.is_featured || false,
        image: null // No podemos cargar la imagen existente como File
      });
      
      // Si hay una imagen, mostramos la vista previa
      if (property.image) {
        setImagePreview(property.image);
      }
    }
  }, [isEdit, property]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'file') {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      
      // Crear una vista previa de la imagen
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Validar campos requeridos
      const requiredFields = ['title', 'description', 'price', 'location', 'property_type', 'operation_type', 'area'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`El campo ${field} es requerido`);
        }
      }
      
      // Convertir valores numéricos
      const numericData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms, 10),
        bathrooms: parseInt(formData.bathrooms, 10),
        area: parseInt(formData.area, 10)
      };
      
      if (isEdit && property) {
        // Actualizar propiedad existente
        await propertyService.updateProperty(property.id, numericData);
        setSuccess('Propiedad actualizada con éxito');
      } else {
        // Crear nueva propiedad
        await propertyService.createProperty(numericData);
        setSuccess('Propiedad creada con éxito');
        
        // Limpiar el formulario después de crear
        if (!isEdit) {
          setFormData({
            title: '',
            description: '',
            price: '',
            location: '',
            property_type: 'House',
            operation_type: 'Sale',
            bedrooms: 0,
            bathrooms: 0,
            area: 0,
            is_featured: false,
            image: null
          });
          setImagePreview(null);
        }
      }
      
      // Redirigir después de un breve retraso
      setTimeout(() => {
        navigate('/admin/properties');
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting property:', err);
      setError(err.message || 'Error al guardar la propiedad. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-form-container">
      <h2>{isEdit ? 'Editar Propiedad' : 'Crear Nueva Propiedad'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Ubicación *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="property_type">Tipo de Propiedad *</label>
            <select
              id="property_type"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
            >
              <option value="House">Casa</option>
              <option value="Apartment">Apartamento</option>
              <option value="Commercial">Comercial</option>
              <option value="Land">Terreno</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="operation_type">Tipo de Operación *</label>
            <select
              id="operation_type"
              name="operation_type"
              value={formData.operation_type}
              onChange={handleChange}
              required
            >
              <option value="Sale">Venta</option>
              <option value="Rent">Alquiler</option>
              <option value="Lease">Arrendamiento</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bedrooms">Habitaciones</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bathrooms">Baños</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="area">Área (m²) *</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="is_featured"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
          />
          <label htmlFor="is_featured">Destacar esta propiedad</label>
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
          
          {isEdit && property.image && !formData.image && (
            <p className="image-note">
              * La propiedad ya tiene una imagen. Si no selecciona una nueva, se mantendrá la actual.
            </p>
          )}
        </div>
        
        <div className="form-buttons">
          <button 
            type="button" 
            onClick={() => navigate('/admin/properties')}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : isEdit ? 'Actualizar Propiedad' : 'Crear Propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;