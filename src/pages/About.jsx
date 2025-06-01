import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>Sobre Nosotros</h1>
        
        <div className="about-content">
          <div className="about-image">
            <img src="/images/about-us.jpg" alt="Nuestro equipo" />
          </div>
          
          <div className="about-text">
            <h2>Nuestra Historia</h2>
            <p>
              Bienes Raices nació en 2010 con la misión de transformar la experiencia de comprar, 
              vender y alquilar propiedades. Desde entonces, hemos ayudado a miles de personas a 
              encontrar el hogar de sus sueños.
            </p>
            
            <h2>Nuestra Misión</h2>
            <p>
              Nuestra misión es proporcionar un servicio excepcional a nuestros clientes, 
              ofreciendo las mejores propiedades y asesoramiento profesional para que tomen 
              decisiones informadas sobre su inversión inmobiliaria.
            </p>
            
            <h2>Nuestros Valores</h2>
            <ul>
              <li><strong>Integridad:</strong> Actuamos con honestidad y transparencia en cada transacción.</li>
              <li><strong>Excelencia:</strong> Nos esforzamos por superar las expectativas de nuestros clientes.</li>
              <li><strong>Compromiso:</strong> Estamos comprometidos con el éxito de cada cliente.</li>
              <li><strong>Innovación:</strong> Utilizamos tecnología de vanguardia para mejorar nuestros servicios.</li>
            </ul>
          </div>
        </div>
        
        <div className="team-section">
          <h2>Nuestro Equipo</h2>
          
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/team-1.jpg" alt="Juan Pérez" />
              <h3>Juan Pérez</h3>
              <p>Director General</p>
            </div>
            
            <div className="team-member">
              <img src="/images/team-2.jpg" alt="María Rodríguez" />
              <h3>María Rodríguez</h3>
              <p>Directora de Ventas</p>
            </div>
            
            <div className="team-member">
              <img src="/images/team-3.jpg" alt="Carlos Gómez" />
              <h3>Carlos Gómez</h3>
              <p>Asesor Inmobiliario</p>
            </div>
            
            <div className="team-member">
              <img src="/images/team-4.jpg" alt="Laura Martínez" />
              <h3>Laura Martínez</h3>
              <p>Asesora Inmobiliaria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;