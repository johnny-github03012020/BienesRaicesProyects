import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  // Improved image handling with fallback
  const renderImage = () => {
    if (property.image) {
      try {
        // Handle both string URLs and File objects
        const imageUrl = property.image instanceof File 
          ? URL.createObjectURL(property.image) 
          : property.image;
        
        console.log('Rendering image with URL:', imageUrl);
        
        return (
          <img 
            src={imageUrl} 
            alt={property.title} 
            onError={(e) => {
              console.log('Image failed to load:', imageUrl);
              e.target.onerror = null;
              e.target.src = '/placeholder.jpg'; // Fallback image
            }} 
          />
        );
      } catch (error) {
        console.error('Error rendering image:', error);
        return <div className="no-image">Error Loading Image</div>;
      }
    } else {
      return <div className="no-image">No Image</div>;
    }
  };

  return (
    <div className="property-card">
      <div className="property-image">
        {renderImage()}
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.location}
        </p>
        <p className="property-price">${property.price?.toLocaleString()}</p>
        <div className="property-features">
          <span><FontAwesomeIcon icon={faBed} /> {property.bedrooms} beds</span>
          <span><FontAwesomeIcon icon={faBath} /> {property.bathrooms} baths</span>
          <span><FontAwesomeIcon icon={faRulerCombined} /> {property.area} m²</span>
        </div>
        <Link to={`/propiedades/${property.id}`} className="btn btn-primary">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;