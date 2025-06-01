import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRulerCombined, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  const { id, title, price, operationType, location, bedrooms, bathrooms, area, propertyType, image } = property;

  // Función para formatear el precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Determinar el color del badge según el tipo de operación
  const getBadgeVariant = (type) => {
    switch (type) {
      case 'venta':
        return 'primary';
      case 'alquiler':
        return 'success';
      case 'arrendamiento':
        return 'info';
      default:
        return 'secondary';
    }
  };

  // Asegurarse de que operationType existe antes de usar charAt
  const getOperationTypeLabel = (type) => {
    if (!type) return "Otro";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Imagen por defecto si no hay una proporcionada
  const defaultImage = "https://via.placeholder.com/300x200?text=Propiedad";

  return (
    <Card className="property-card h-100 shadow-sm">
      <div className="property-image-container">
        <Card.Img variant="top" src={image || defaultImage} className="property-image" />
        <Badge 
          bg={getBadgeVariant(operationType)} 
          className="position-absolute top-0 end-0 m-2"
        >
          {getOperationTypeLabel(operationType)}
        </Badge>
      </div>
      <Card.Body>
        <Card.Title className="property-title">{title || "Propiedad sin título"}</Card.Title>
        <div className="location mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1 text-muted" />
          <small className="text-muted">{location || "Ubicación no especificada"}</small>
        </div>
        <Card.Text className="price mb-3">
          {formatPrice(price || 0)}
          {operationType !== 'venta' && <span className="period">/mes</span>}
        </Card.Text>
        <div className="property-features d-flex justify-content-between">
          {bedrooms !== undefined && (
            <div className="feature">
              <FontAwesomeIcon icon={faBed} className="me-1" />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms !== undefined && (
            <div className="feature">
              <FontAwesomeIcon icon={faBath} className="me-1" />
              <span>{bathrooms}</span>
            </div>
          )}
          {area !== undefined && (
            <div className="feature">
              <FontAwesomeIcon icon={faRulerCombined} className="me-1" />
              <span>{area} m²</span>
            </div>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0">
        <Link to={`/properties/${id || 0}`} className="btn btn-outline-primary w-100">
          Ver detalles
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PropertyCard;