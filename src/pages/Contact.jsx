import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  // Santo Domingo coordinates
  const position = [18.4861, -69.9312];

  return (
    <div className="contact-container">
      <h1>Contáctanos</h1>
      
      <div className="contact-content">
        <div className="contact-form-container">
          <h2>Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
          </form>
        </div>
        
        <div className="contact-info">
          <h2>Información de Contacto</h2>
          <div className="info-item">
            <strong>Dirección:</strong>
            <p>Calle Principal #123, Santo Domingo, R.D.</p>
          </div>
          <div className="info-item">
            <strong>Teléfono:</strong>
            <p>(123) 456-7890</p>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <p>info@bienesraices.com</p>
          </div>
          <div className="info-item">
            <strong>Horario:</strong>
            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p>Sábados: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <h2>Nuestra Ubicación</h2>
        <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              Bienes Raíces <br /> Calle Principal #123, Santo Domingo
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Contact;