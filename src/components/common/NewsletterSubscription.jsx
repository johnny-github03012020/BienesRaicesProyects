import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Newsletter.css';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Simulación de suscripción (en un proyecto real, esto sería una llamada a una API)
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
      setValidated(false);
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <h3>Mantente informado</h3>
        <p>Suscríbete a nuestro boletín para recibir las últimas novedades y ofertas exclusivas.</p>
        
        {subscribed ? (
          <Alert variant="success" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            <span>¡Gracias por suscribirte a nuestro boletín!</span>
          </Alert>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button variant="primary" type="submit">
                Suscribirse
              </Button>
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un correo electrónico válido.
              </Form.Control.Feedback>
            </InputGroup>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscription;