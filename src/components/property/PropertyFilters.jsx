import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUndo } from '@fortawesome/free-solid-svg-icons';

const PropertyFilters = ({ filters, onApplyFilters, onResetFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'minPrice' ? 0 : 1;
    const newPriceRange = [...localFilters.priceRange];
    newPriceRange[index] = parseInt(value);
    setLocalFilters({
      ...localFilters,
      priceRange: newPriceRange
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    onResetFilters();
    setLocalFilters(filters);
  };

  return (
    <div className="filters-container">
      <div className="filters-header bg-dark text-white p-3 mb-3">
        <h5 className="m-0">Filtros</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Operación</Form.Label>
          <Form.Select 
            name="operationType" 
            value={localFilters.operationType} 
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
            <option value="arrendamiento">Arrendamiento</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rango de Precio {localFilters.operationType === 'venta' ? '' : 'Mensual'} ($)</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="number"
              name="minPrice"
              value={localFilters.priceRange[0]}
              onChange={handlePriceChange}
              min="0"
              className="me-2"
            />
            <span>-</span>
            <Form.Control
              type="number"
              name="maxPrice"
              value={localFilters.priceRange[1]}
              onChange={handlePriceChange}
              min={localFilters.priceRange[0]}
              className="ms-2"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Habitaciones (mínimo)</Form.Label>
          <Form.Select 
            name="bedrooms" 
            value={localFilters.bedrooms} 
            onChange={handleChange}
          >
            <option value="">Cualquier cantidad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </Form.Select>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 mb-2"
        >
          <FontAwesomeIcon icon={faFilter} className="me-2" />
          Aplicar Filtros
        </Button>
        
        <Button 
          variant="outline-secondary" 
          type="button" 
          className="w-100" 
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faUndo} className="me-2" />
          Resetear Filtros
        </Button>
      </Form>
    </div>
  );
};

export default PropertyFilters;