import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import propertyService from '../services/propertyService';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getAllProperties();
      if (Array.isArray(data)) {
        setProperties(data);
      } else {
        setProperties([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching properties for admin:', err);
      setError('Error al cargar las propiedades. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/properties/edit/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    setLoading(true);
    try {
      await propertyService.deleteProperty(deleteId);
      setProperties(properties.filter(prop => prop.id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error('Error deleting property:', err);
      setError('Error al eliminar la propiedad. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="admin-dashboard">
      <h1>Administración de Propiedades</h1>
      
      <div className="admin-actions">
        <Link to="/admin/properties/create" className="create-button">
          Crear Nueva Propiedad
        </Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Cargando propiedades...</div>
      ) : properties.length === 0 ? (
        <div className="no-properties">
          No hay propiedades disponibles. ¡Crea una nueva!
        </div>
      ) : (
        <div className="properties-table-container">
          <table className="properties-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Tipo</th>
                <th>Operación</th>
                <th>Destacada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(property => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>
                    {property.image ? (
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="property-thumbnail" 
                      />
                    ) : (
                      <div className="no-image-thumbnail">Sin imagen</div>
                    )}
                  </td>
                  <td>{property.title}</td>
                  <td>${property.price?.toLocaleString() || 'N/A'}</td>
                  <td>{property.property_type}</td>
                  <td>{property.operation_type}</td>
                  <td>
                    <span className={`featured-badge ${property.is_featured ? 'is-featured' : ''}`}>
                      {property.is_featured ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleEdit(property.id)}
                      className="edit-button"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(property.id)}
                      className="delete-button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.</p>
            <div className="modal-buttons">
              <button onClick={cancelDelete} className="cancel-button">Cancelar</button>
              <button onClick={confirmDelete} className="confirm-button">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;