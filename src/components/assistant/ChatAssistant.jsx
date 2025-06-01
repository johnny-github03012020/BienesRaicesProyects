import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, faPaperPlane, faTimes, 
  faComments, faSpinner
} from '@fortawesome/free-solid-svg-icons';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Hello! I\'m your real estate assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I can help you find properties that match your criteria. What type of property are you looking for?",
        "That's a great area! There are currently 15 properties available in that location.",
        "The average price for a 3-bedroom house in that area is $450,000.",
        "Would you like me to schedule a viewing for this property?",
        "I can provide more information about the neighborhood, such as schools, amenities, and transportation options.",
        "Based on your preferences, I recommend checking out properties in the following areas: Downtown, Westside, and Northpark."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-assistant">
      {/* Chat Button */}
      <button 
        className="chat-button btn btn-primary rounded-circle position-fixed"
        style={{ bottom: '20px', right: '20px', width: '60px', height: '60px', zIndex: 1000 }}
        onClick={toggleChat}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faComments} size="lg" />
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chat-window card position-fixed shadow"
          style={{ 
            bottom: '90px', 
            right: '20px', 
            width: '350px', 
            height: '500px',
            zIndex: 1000
          }}
        >
          <div className="card-header bg-primary text-white py-3">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faRobot} className="me-2" />
              <div>
                <h5 className="mb-0">Real Estate Assistant</h5>
                <small>Online | Ready to help</small>
              </div>
            </div>
          </div>
          
          <div 
            className="card-body p-3 overflow-auto"
            style={{ height: '370px' }}
          >
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`d-flex mb-3 ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                {message.sender === 'bot' && (
                  <div 
                    className="avatar rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                    style={{ width: '40px', height: '40px', flexShrink: 0 }}
                  >
                    <FontAwesomeIcon icon={faRobot} />
                  </div>
                )}
                
                <div 
                  className={`message p-3 rounded ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-light'
                  }`}
                  style={{ maxWidth: '75%' }}
                >
                  <p className="mb-0">{message.text}</p>
                  <small 
                    className={`d-block mt-1 ${message.sender === 'user' ? 'text-white-50' : 'text-muted'}`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
                
                {message.sender === 'user' && (
                  <div 
                    className="avatar rounded-circle bg-info d-flex align-items-center justify-content-center ms-2"
                    style={{ width: '40px', height: '40px', flexShrink: 0 }}
                  >
                    <span className="text-white">
                      {message.sender.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="d-flex mb-3 justify-content-start">
                <div 
                  className="avatar rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                  style={{ width: '40px', height: '40px', flexShrink: 0 }}
                >
                  <FontAwesomeIcon icon={faRobot} />
                </div>
                <div className="message p-3 rounded bg-light" style={{ maxWidth: '75%' }}>
                  <div className="typing-indicator">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span className="ms-2">Typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="card-footer bg-white p-3">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Type your message..." 
                  value={inputMessage}
                  onChange={handleInputChange}
                  disabled={isTyping}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;