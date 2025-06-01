import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useConfig } from '../context/ConfigContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLevel, setUserLevel] = useState('');
  const [userLevelClass, setUserLevelClass] = useState('');
  const navigate = useNavigate();
  const { shouldShowAdminAccess } = useConfig();
  
  useEffect(() => {
    // Obtener información del usuario actual
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    
    // Determinar el nivel del usuario
    if (user) {
      if (authService.isAdmin()) {
        setUserLevel('Administrador');
        setUserLevelClass('admin');
      } else if (user.role === 'agent') {
        setUserLevel('Agente');
        setUserLevelClass('agent');
      } else {
        setUserLevel('Cliente');
        setUserLevelClass('client');
      }
    }
  }, []);
  
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setUserLevel('');
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Bienes Raíces</Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/propiedades" className="nav-link">Propiedades</Link>
          <Link to="/nosotros" className="nav-link">Nosotros</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </div>
        
        <div className="navbar-auth">
          {currentUser ? (
            <>
              <span className="user-greeting">
                Hola, {currentUser.username} 
                <span className={`user-level ${userLevelClass}`}>
                  {userLevel}
                </span>
              </span>
              {shouldShowAdminAccess() && (
                <Link to="/admin" className="nav-link admin-link">Admin</Link>
              )}
              <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Iniciar Sesión</Link>
              <Link to="/register" className="btn-register">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;