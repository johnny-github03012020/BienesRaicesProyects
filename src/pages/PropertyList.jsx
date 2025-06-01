import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propertyService from '../services/propertyService';
import '../styles/PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getAllProperties();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('No se pudieron cargar las propiedades. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="loading">Cargando propiedades...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="property-list-container">
      <h1>Todas las Propiedades</h1>
      
      <div className="property-grid">
        {properties.length > 0 ? (
          properties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                {property.image ? (
                  <img src={property.image} alt={property.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-price">${property.price.toLocaleString()}</p>
                <div className="property-details">
                  <span>{property.bedrooms} beds</span>
                  <span>{property.bathrooms} baths</span>
                  <span>{property.area} m²</span>
                </div>
                <Link to={`/propiedades/${property.id}`} className="view-details-btn">
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-properties">No hay propiedades disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;