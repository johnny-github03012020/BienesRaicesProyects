import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/propertyService';
import '../styles/Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }
  
  return (
    <div className="properties-page">
      <h1>Todas las Propiedades</h1>
      <div className="properties-grid">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;