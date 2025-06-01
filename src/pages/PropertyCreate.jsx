import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/property/PropertyForm';
import '../assets/styles/PropertyForm.css';

const PropertyCreate = () => {
  const navigate = useNavigate();

  return (
    <div className="property-create-page">
      <div className="page-header">
        <h1>Crear Nueva Propiedad</h1>
        <button onClick={() => navigate('/admin/properties')} className="back-button">
          Volver a la lista
        </button>
      </div>
      
      <PropertyForm isEdit={false} />
    </div>
  );
};

export default PropertyCreate;