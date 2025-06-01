import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        message: '¡Gracias por contactarnos! Te responderemos lo antes posible.',
      });
      
      // Resetear el formulario después de enviar
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
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
    <div className="contact-form-container">
      {submitStatus.submitted && (
        <Alert 
          variant={submitStatus.success ? 'success' : 'danger'}
          className="mb-4"
        >
          {submitStatus.message}
        </Alert>
      )}
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="contactName">
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
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3" controlId="contactEmail">
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
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="contactPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingresa tu número de teléfono"
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3" controlId="contactSubject">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto de tu mensaje"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa el asunto de tu mensaje.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-4" controlId="contactMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Escribe tu mensaje aquí..."
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa tu mensaje.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit" 
          className="submit-button"
          disabled={submitStatus.submitted}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
          Enviar mensaje
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;