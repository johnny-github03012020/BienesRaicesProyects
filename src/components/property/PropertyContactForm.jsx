import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/ContactForm.css';

const PropertyContactForm = ({ property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    visitDate: '',
    visitTime: '',
    requestVisit: false,
  });
  
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    
    // Simulación de envío de formulario (en un proyecto real, esto sería una llamada a una API)
    setTimeout(() => {
      setSubmitStatus({
        submitted: true,
        success: true,
        message: formData.requestVisit 
          ? '¡Gracias por tu interés! Hemos recibido tu solicitud de visita y te contactaremos pronto para confirmar.'
          : '¡Gracias por tu interés! Te responderemos lo antes posible con más información sobre esta propiedad.',
      });
      
      // Resetear el formulario después de enviar
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        visitDate: '',
        visitTime: '',
        requestVisit: false,
      });
      setValidated(false);
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus({
          submitted: false,
          success: false,
          message: '',
        });
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="property-contact-form">
      <h4 className="mb-3">¿Interesado en esta propiedad?</h4>
      
      {submitStatus.submitted && (
        <Alert 
          variant={submitStatus.success ? 'success' : 'danger'}
          className="mb-4"
        >
          {submitStatus.message}
        </Alert>
      )}
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="propertyContactName">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa tu nombre.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="propertyContactEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un correo electrónico válido.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3" controlId="propertyContactPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingresa tu número de teléfono"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu número de teléfono.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3" controlId="propertyContactMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder={`Me interesa esta ${property?.propertyType.toLowerCase() || 'propiedad'} en ${property?.location || 'esta ubicación'}. Por favor contáctenme con más información.`}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa tu mensaje.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="propertyContactVisit">
          <Form.Check
            type="checkbox"
            name="requestVisit"
            checked={formData.requestVisit}
            onChange={handleChange}
            label="Quiero programar una visita"
          />
        </Form.Group>
        
        {formData.requestVisit && (
          <Row className="visit-scheduling mb-3">
            <Col md={6}>
              <Form.Group controlId="propertyContactVisitDate">
                <Form.Label>Fecha preferida</Form.Label>
                <Form.Control
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required={formData.requestVisit}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor selecciona una fecha.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="propertyContactVisitTime">
                <Form.Label>Hora preferida</Form.Label>
                <Form.Control
                  type="time"
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleChange}
                  required={formData.requestVisit}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor selecciona una hora.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        )}
        
        <Button 
          variant="primary" 
          type="submit" 
          className="submit-button w-100"
          disabled={submitStatus.submitted}
        >
          {formData.requestVisit ? (
            <>
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Solicitar visita
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
              Enviar consulta
            </>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default PropertyContactForm;