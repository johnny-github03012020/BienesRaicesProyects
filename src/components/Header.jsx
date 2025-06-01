import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Header.css';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    
    // Configurar un intervalo para verificar periódicamente si el usuario sigue autenticado
    const checkAuthInterval = setInterval(() => {
      if (!authService.isAuthenticated()) {
        setCurrentUser(null);
      }
    }, 60000); // Verificar cada minuto
    
    return () => clearInterval(checkAuthInterval);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>Bienes<span>Raices</span></h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/properties">Propiedades</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            
            {/* Mostrar información del usuario o enlaces de inicio de sesión */}
            {loading ? (
              <li className="user-info loading">Cargando...</li>
            ) : currentUser ? (
              <li className="user-info">
                <div className="user-dropdown">
                  <span className="user-name">
                    {currentUser.username || currentUser.email}
                  </span>
                  <div className="dropdown-content">
                    {currentUser.is_staff && (
                      <Link to="/admin/properties">Panel Admin</Link>
                    )}
                    <Link to="/profile">Mi Perfil</Link>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li><Link to="/login" className="btn btn-primary">Iniciar Sesión</Link></li>
                <li><Link to="/register" className="btn btn-secondary">Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;