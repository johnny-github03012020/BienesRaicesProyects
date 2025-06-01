import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
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

  const handleDeleteProperty = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta propiedad?')) {
      try {
        await propertyService.deleteProperty(id);
        setProperties(properties.filter(property => property.id !== id));
      } catch (err) {
        console.error('Error deleting property:', err);
        alert('No se pudo eliminar la propiedad. Por favor, intente de nuevo.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando panel de administración...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      
      <div className="admin-actions">
        <Link to="/admin/properties/create" className="btn-create">
          Crear Nueva Propiedad
        </Link>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Ubicación</th>
              <th>Precio</th>
              <th>Destacada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map(property => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>${property.price.toLocaleString()}</td>
                  <td>{property.featured ? 'Sí' : 'No'}</td>
                  <td className="actions-cell">
                    <Link to={`/admin/properties/edit/${property.id}`} className="btn-edit">
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDeleteProperty(property.id)} 
                      className="btn-delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No hay propiedades disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;