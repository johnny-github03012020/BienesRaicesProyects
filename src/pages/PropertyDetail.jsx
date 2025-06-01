import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../services/propertyService';
import PropertyContactForm from '../components/property/PropertyContactForm';
import '../assets/styles/PropertyDetails.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        setError('Error loading property details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="loading">Loading property details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div className="not-found">Property not found</div>;

  return (
    <div className="property-detail-container">
      <h1>{property.title}</h1>
      
      <div className="property-location">
        <i className="fas fa-map-marker-alt"></i> {property.location}
      </div>
      
      {/* Espacio para anuncio superior */}
      <div className="ad-space ad-space-top">
        {/* El componente de anuncio se renderizará aquí */}
      </div>

      <div className={`property-main property-model-${property.pageModel || 'clasico'}`}>
        {property.pageModel === 'galeria' ? (
          <div className="property-gallery">
            <div className="gallery-main">
              {property.images && property.images.length > 0 ? (
                <img 
                  src={property.images[activeImageIndex]} 
                  alt={`${property.title} - imagen ${activeImageIndex + 1}`} 
                  className="main-image" 
                />
              ) : property.image ? (
                <img src={property.image} alt={property.title} className="main-image" />
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            <div className="gallery-thumbnails">
              {property.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${property.title} - thumbnail ${index + 1}`}
                  className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>
        ) : property.pageModel === 'mapa' ? (
          <div className="property-map-view">
            <div className="property-image">
              {property.image && <img src={property.image} alt={property.title} className="main-image" />}
            </div>
            <div className="property-map">
              {/* Aquí se renderizará el mapa con las coordenadas */}
              {property.coordinates && (
                <div id="map" style={{ height: '400px', width: '100%' }}></div>
              )}
            </div>
          </div>
        ) : (
          // Modelo clásico
          <div className="property-images">
            {property.image ? (
              <img src={property.image} alt={property.title} className="main-image" />
            ) : (
              <div className="no-image">No image available</div>
            )}
          </div>
        )}
        
        <div className="property-info">
          {/* Espacio para anuncio lateral */}
          <div className="ad-space ad-space-side">
            {/* El componente de anuncio se renderizará aquí */}
          </div>

          <div className="property-price">${property.price.toLocaleString()}</div>
          
          <div className="property-features">
            <div className="feature">
              <i className="fas fa-bed"></i>
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="feature">
              <i className="fas fa-bath"></i>
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="feature">
              <i className="fas fa-ruler-combined"></i>
              <span>{property.area} m²</span>
            </div>
          </div>
          
          <div className="property-type-info">
            <span className="property-type">{property.property_type}</span>
            <span className="operation-type">{property.operation_type}</span>
          </div>
          
          <div className="property-description">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          {/* Espacio para anuncio medio */}
          <div className="ad-space ad-space-middle">
            {/* El componente de anuncio se renderizará aquí */}
          </div>
          
          <PropertyContactForm propertyId={property.id} propertyTitle={property.title} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;