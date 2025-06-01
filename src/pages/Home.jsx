import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import propertyService from '../services/propertyService';
import './Home.css';
// Remove the Helmet import
// Rest of the file remains the same

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getFeaturedProperties();
        setFeaturedProperties(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Error al cargar las propiedades destacadas. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para suscribir al usuario
    alert(`Gracias por suscribirte con: ${email}`);
    setEmail('');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80')" 
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Property</h1>
          <p className="hero-subtitle">Discover the perfect property that matches your lifestyle and needs</p>
          <Link to="/properties" className="search-button">
            Buscar Propiedades
          </Link>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Properties</h2>
          
          {loading ? (
            <div className="loading-message">Cargando propiedades destacadas...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="properties-grid">
              {featuredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-image">
                    {property.image ? (
                      <img src={property.image} alt={property.title} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>
                  <div className="property-details">
                    <h3 className="property-title">{property.title}</h3>
                    <p className="property-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.location}
                    </p>
                    <p className="property-price">${property.price?.toLocaleString()}</p>
                    <div className="property-features">
                      <span><FontAwesomeIcon icon={faBed} /> {property.bedrooms} beds</span>
                      <span><FontAwesomeIcon icon={faBath} /> {property.bathrooms} baths</span>
                      <span><FontAwesomeIcon icon={faRulerCombined} /> {property.area} m²</span>
                    </div>
                    <Link to={`/property/${property.id}`} className="view-details-button">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore Properties by Type</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">🏠</div>
              <h3 className="category-title">Houses</h3>
              <p className="category-description">Find your perfect family home</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🏢</div>
              <h3 className="category-title">Apartments</h3>
              <p className="category-description">Modern urban living spaces</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🏗️</div>
              <div className="category-title">Commercial</div>
              <p className="category-description">Spaces for your business</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🌄</div>
              <h3 className="category-title">Land</h3>
              <p className="category-description">Build your dream from scratch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Property Section */}
      <section className="sell-section">
        <div className="container">
          <h2 className="section-title">Sell Property</h2>
          <p className="section-description">List your property and reach potential buyers</p>
          <Link to="/contact" className="contact-button">Contact Us</Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Mantente informado</h2>
          <p className="newsletter-description">
            Suscríbete a nuestro boletín para recibir las últimas novedades y ofertas exclusivas.
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-button">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;