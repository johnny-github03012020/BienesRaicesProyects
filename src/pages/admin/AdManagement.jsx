import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdManagement.css';

const AdManagement = () => {
  const navigate = useNavigate();
  const [ad, setAd] = useState({
    name: '',
    url: '',
    location: 'superior', // superior, lateral, medio
    image: null,
    active: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setAd({
        ...ad,
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
      setAd({
        ...ad,
        [name]: checked
      });
    } else {
      setAd({
        ...ad,
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
      for (const key in ad) {
        if (key === 'image' && ad[key] instanceof File) {
          formData.append(key, ad[key]);
        } else if (ad[key] !== null) {
          formData.append(key, ad[key]);
        }
      }
      
      // TODO: Implement adService.createAd(formData);
      navigate('/admin/ads');
    } catch (err) {
      console.error('Error creating ad:', err);
      setError('Error al crear el anuncio. Por favor, intente de nuevo.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="ad-management-container">
      <h1>Gestión de Anuncios</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="ad-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Anuncio</label>
          <input
            type="text"
            id="name"
            name="name"
            value={ad.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="url">URL del Anuncio</label>
          <input
            type="url"
            id="url"
            name="url"
            value={ad.url}
            onChange={handleChange}
            required
            placeholder="https://"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <select
            id="location"
            name="location"
            value={ad.location}
            onChange={handleChange}
            required
          >
            <option value="superior">Banner Superior</option>
            <option value="lateral">Banner Lateral</option>
            <option value="medio">Banner Medio</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Imagen del Anuncio</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
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
            id="active"
            name="active"
            checked={ad.active}
            onChange={handleChange}
          />
          <label htmlFor="active">Activo</label>
        </div>
        
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate('/admin/ads')}
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
            {formSubmitting ? 'Guardando...' : 'Guardar Anuncio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdManagement;