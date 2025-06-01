import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Bienes<span>Raices</span></h2>
            <p>Tu mejor opción para encontrar tu hogar ideal</p>
          </div>
          
          <div className="footer-links">
            <h3>Enlaces rápidos</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/properties">Propiedades</Link></li>
              <li><Link to="/about">Nosotros</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contacto</h3>
            <p><i className="fas fa-map-marker-alt"></i> Calle Principal #123, Ciudad</p>
            <p><i className="fas fa-phone"></i> (123) 456-7890</p>
            <p><i className="fas fa-envelope"></i> info@bienesraices.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} BienesRaices. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;