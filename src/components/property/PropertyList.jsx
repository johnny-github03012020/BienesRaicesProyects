import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import '../../assets/styles/Properties.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    property_type: '',
    operation_type: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
    bathrooms: '',
    location: ''
  });
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching all properties');
      const data = await propertyService.getAllProperties();
      console.log('Properties data:', data);
      
      if (Array.isArray(data)) {
        setProperties(data);
        console.log(`Successfully loaded ${data.length} properties`);
      } else {
        console.warn('Unexpected data format:', data);
        setProperties([]);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Error al cargar propiedades. Por favor, intente de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      // Remove empty filters
      const activeFilters = {};
      for (const key in filters) {
        if (filters[key] !== '') {
          activeFilters[key] = filters[key];
        }
      }
      
      console.log('Applying filters:', activeFilters);
      const data = await propertyService.searchProperties(activeFilters);
      console.log('Filtered data:', data);
      
      if (Array.isArray(data)) {
        setProperties(data);
        console.log(`Successfully loaded ${data.length} filtered properties`);
      } else {
        console.warn('Unexpected filtered data format:', data);
        setProperties([]);
      }
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Error al aplicar los filtros. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      property_type: '',
      operation_type: '',
      min_price: '',
      max_price: '',
      bedrooms: '',
      bathrooms: '',
      location: ''
    });
    fetchProperties();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    if (tab === 'all') {
      resetFilters();
    } else {
      // Map tab names to operation_type values
      const operationTypeMap = {
        'venta': 'Sale',
        'alquiler': 'Rent',
        'arrendamiento': 'Lease'
      };
      
      const operationType = operationTypeMap[tab];
      
      if (operationType) {
        setLoading(true);
        setError(null);
        
        // Apply the operation type filter
        propertyService.searchProperties({ operation_type: operationType })
          .then(data => {
            console.log(`Properties filtered by ${operationType}:`, data);
            
            if (Array.isArray(data)) {
              setProperties(data);
              console.log(`Successfully loaded ${data.length} properties for ${tab}`);
            } else {
              console.warn('Unexpected tab filtered data format:', data);
              setProperties([]);
            }
            
            // Update the filters state
            setFilters({
              ...filters,
              operation_type: operationType
            });
          })
          .catch(err => {
            console.error('Error applying tab filter:', err);
            setError('Error al aplicar los filtros. Por favor, intente de nuevo.');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <div className="properties-container">
      <h1>Nuestras Propiedades</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          Todas
        </button>
        <button 
          className={`tab ${activeTab === 'venta' ? 'active' : ''}`}
          onClick={() => handleTabChange('venta')}
        >
          Venta
        </button>
        <button 
          className={`tab ${activeTab === 'alquiler' ? 'active' : ''}`}
          onClick={() => handleTabChange('alquiler')}
        >
          Alquiler
        </button>
        <button 
          className={`tab ${activeTab === 'arrendamiento' ? 'active' : ''}`}
          onClick={() => handleTabChange('arrendamiento')}
        >
          Arrendamiento
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="filters-section">
        <h2>Filtros</h2>
        <div className="filter-group">
          <label>Tipo de Operación</label>
          <select 
            name="operation_type" 
            value={filters.operation_type}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="Sale">Venta</option>
            <option value="Rent">Alquiler</option>
            <option value="Lease">Arrendamiento</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Rango de Precio Mensual ($)</label>
          <div className="price-range">
            <input 
              type="number" 
              name="min_price"
              placeholder="0" 
              value={filters.min_price}
              onChange={handleFilterChange}
            />
            <input 
              type="number" 
              name="max_price"
              placeholder="1000000" 
              value={filters.max_price}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Habitaciones (mínimo)</label>
          <select 
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
          >
            <option value="">Cualquier cantidad</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        
        <div className="filter-buttons">
          <button onClick={applyFilters}>Aplicar Filtros</button>
          <button onClick={resetFilters}>Resetear Filtros</button>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Cargando propiedades...</div>
      ) : properties.length === 0 ? (
        <div className="no-properties">No se encontraron propiedades que coincidan con sus criterios.</div>
      ) : (
        <div className="property-grid">
          {properties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                {property.image ? (
                  <img src={property.image} alt={property.title} />
                ) : (
                  <div className="no-image">No hay imagen</div>
                )}
                {property.operation_type && (
                  <span className={`badge ${
                    property.operation_type === 'Sale' ? 'sale' : 
                    property.operation_type === 'Rent' ? 'rent' : 'lease'
                  }`}>
                    {property.operation_type === 'Sale' ? 'Venta' : 
                     property.operation_type === 'Rent' ? 'Alquiler' : 'Arrendamiento'}
                  </span>
                )}
              </div>
              <div className="property-details">
                <h3>{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-price">${property.price ? property.price.toLocaleString() : 'Precio no disponible'}</p>
                <div className="property-features">
                  <span>{property.bedrooms || 0} hab</span>
                  <span>{property.bathrooms || 0} baños</span>
                  <span>{property.area || 0} m²</span>
                </div>
                <Link to={`/property/${property.id}`} className="view-details-btn">
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;