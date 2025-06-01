import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar si hay un mensaje de éxito en el estado de la ubicación
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      console.log('Intentando iniciar sesión con:', credentials);
      const response = await authService.login(credentials);
      console.log('Login successful:', response);
      
      // Verificar si hay una ruta de redirección guardada
      const redirectPath = localStorage.getItem('authRedirectPath');
      if (redirectPath) {
        localStorage.removeItem('authRedirectPath');
        navigate(redirectPath);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data) {
        // Mostrar errores específicos del servidor
        if (error.response.data.non_field_errors) {
          setError(error.response.data.non_field_errors.join(' '));
        } else if (typeof error.response.data === 'string') {
          setError(error.response.data);
        } else {
          setError('Credenciales inválidas. Por favor, intente de nuevo.');
        }
      } else {
        setError('Error al iniciar sesión. Por favor, intente de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Iniciar Sesión</h1>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
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
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>¿No tiene una cuenta? <Link to="/register">Registrarse</Link></p>
          <p><Link to="/">Volver al inicio</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;