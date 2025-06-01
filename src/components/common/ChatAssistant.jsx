import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes, faRobot } from '@fortawesome/free-solid-svg-icons';
import HistoryService from '../../services/HistoryService';
import '../../assets/styles/ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial welcome message
      setMessages([{ 
        text: "¡Hola! Soy tu asistente inmobiliario virtual. ¿En qué puedo ayudarte hoy?", 
        isBot: true,
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      const botResponse = {
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Simple response logic - in a real app, this would be more sophisticated
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Registrar la pregunta en el historial
    HistoryService.saveEvent('chat_question', { question: userInput });
    
    // Preguntas sobre propiedades
    if (input.includes('propiedad') || input.includes('propiedades') || input.includes('inmueble')) {
      if (input.includes('tipo') || input.includes('clase')) {
        return "Ofrecemos diversos tipos de propiedades: apartamentos, casas, oficinas, locales comerciales, terrenos y más. ¿Qué tipo te interesa?";
      } else if (input.includes('nueva') || input.includes('reciente')) {
        return "Constantemente actualizamos nuestro catálogo. Las propiedades más recientes se muestran primero en nuestra página principal. ¿Buscas alguna zona en particular?";
      } else {
        return "Tenemos una amplia variedad de propiedades disponibles. Puedes filtrarlas por tipo, ubicación, precio y características en nuestra página de propiedades. ¿Necesitas ayuda con algún filtro específico?";
      }
    }
    
    // Preguntas sobre precios
    if (input.includes('precio') || input.includes('costo') || input.includes('valor')) {
      if (input.includes('barato') || input.includes('económico') || input.includes('accesible')) {
        return "Nuestras propiedades más accesibles comienzan desde $80,000 para compra y $500 mensuales para alquiler, dependiendo de la ubicación y características.";
      } else if (input.includes('caro') || input.includes('lujo') || input.includes('premium')) {
        return "Contamos con propiedades de lujo que pueden alcanzar hasta $1,000,000 o más, con acabados premium y ubicaciones exclusivas.";
      } else {
        return "Los precios de nuestras propiedades varían según la ubicación, tamaño y características. ¿Tienes un rango de precio específico en mente?";
      }
    }
    
    // Preguntas sobre ubicación
    if (input.includes('ubicación') || input.includes('zona') || input.includes('donde') || input.includes('barrio')) {
      if (input.includes('centro')) {
        return "Tenemos varias propiedades en el centro de la ciudad, ideales si buscas estar cerca de comercios y servicios. ¿Te interesa alguna en particular?";
      } else if (input.includes('norte') || input.includes('sur') || input.includes('este') || input.includes('oeste')) {
        return "Contamos con propiedades en todas las zonas de la ciudad. ¿Buscas alguna característica específica en esa zona?";
      } else {
        return "Tenemos propiedades en diversas zonas de la ciudad. Las más populares son Centro, Norte y Zona Residencial. ¿Hay alguna zona específica que te interese?";
      }
    }
    
    // Preguntas sobre contacto
    if (input.includes('contacto') || input.includes('agente') || input.includes('asesor') || input.includes('llamar') || input.includes('teléfono')) {
      return "Puedes contactar a nuestros agentes al teléfono (555) 123-4567, por email a info@bienesraices.com o visitando nuestra oficina en Av. Principal 123. También puedes usar nuestro formulario de contacto en la página correspondiente.";
    }
    
    // Preguntas sobre financiamiento
    if (input.includes('financiamiento') || input.includes('crédito') || input.includes('hipoteca') || input.includes('préstamo')) {
      return "Trabajamos con varias instituciones financieras que ofrecen créditos hipotecarios con tasas competitivas. Nuestros asesores pueden ayudarte a encontrar la mejor opción según tus necesidades y capacidad de pago.";
    }
    
    // Saludos y despedidas
    if (input.includes('gracias') || input.includes('thank')) {
      return "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?";
    } else if (input.includes('hola') || input.includes('hi') || input.includes('hello') || input.includes('buenos días') || input.includes('buenas tardes')) {
      return "¡Hola! Bienvenido a Bienes Raíces. ¿En qué puedo ayudarte con tu búsqueda de propiedades?";
    } else if (input.includes('adiós') || input.includes('bye') || input.includes('hasta luego')) {
      return "¡Hasta luego! Si tienes más preguntas en el futuro, no dudes en volver a contactarme.";
    }
    
    // Respuesta por defecto
    return "Gracias por tu mensaje. Para poder ayudarte mejor, ¿podrías proporcionar más detalles sobre lo que estás buscando? Por ejemplo, tipo de propiedad, ubicación o rango de precio.";
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-assistant-container">
      {isOpen ? (
        <Card className="chat-card">
          <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faRobot} className="me-2" />
              <span>Asistente Inmobiliario</span>
            </div>
            <Button variant="link" className="text-white p-0" onClick={toggleChat}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Card.Header>
          <Card.Body className="chat-body">
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className="message-wrapper">
                  <div className={`message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
                    {msg.text}
                  </div>
                  <div className={`message-time ${msg.isBot ? 'bot-time' : 'user-time'}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Card.Body>
          <Card.Footer className="p-2 bg-white">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  placeholder="Escribe tu mensaje..."
                  value={input}
                  onChange={handleInputChange}
                />
                <Button type="submit" variant="primary">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      ) : (
        <Button 
          className="chat-toggle-button" 
          variant="primary" 
          onClick={toggleChat}
        >
          <FontAwesomeIcon icon={faRobot} className="me-2" />
          Asistente Virtual
        </Button>
      )}
    </div>
  );
};

export default ChatAssistant;