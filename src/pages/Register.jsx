import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    secretCode: ''
  });
  
  const [showSecretField, setShowSecretField] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const toggleSecretField = () => {
    setShowSecretField(!showSecretField);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      setLoading(true);
      await authService.register(formData);
      navigate('/');
    } catch (error) {
      setError('Error al registrar usuario. Por favor intente nuevamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Crear Cuenta</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Tipo de Usuario</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="client">Cliente</option>
              <option value="agent">Agente Inmobiliario</option>
            </select>
          </div>
          
          <div className="form-group admin-toggle">
            <button 
              type="button" 
              className="toggle-admin-btn"
              onClick={toggleSecretField}
            >
              {showSecretField ? "Ocultar opciones avanzadas" : "Mostrar opciones avanzadas"}
            </button>
          </div>
          
          {showSecretField && (
            <div className="form-group">
              <label htmlFor="secretCode">Código de Administrador</label>
              <input
                type="password"
                id="secretCode"
                name="secretCode"
                value={formData.secretCode}
                onChange={handleChange}
                placeholder="Ingrese el código secreto para administradores"
              />
              <small>Solo para usuarios autorizados</small>
            </div>
          )}
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Registrarse'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;