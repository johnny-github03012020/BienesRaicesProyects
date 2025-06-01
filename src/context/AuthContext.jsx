import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtAuthService from '../services/jwtAuthService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isValid = await jwtAuthService.verifyToken();
        if (isValid) {
          const userData = jwtAuthService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error al inicializar la autenticación:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const userData = await jwtAuthService.login(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const newUser = await jwtAuthService.register(userData);
      setUser(newUser);
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    jwtAuthService.logout();
    setUser(null);
  };

  const checkPermission = async (permission) => {
    try {
      return await jwtAuthService.hasPermission(permission);
    } catch (error) {
      console.error('Error al verificar permiso:', error);
      return false;
    }
  };

  const checkRole = async (role) => {
    try {
      return await jwtAuthService.hasRole(role);
    } catch (error) {
      console.error('Error al verificar rol:', error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkPermission,
    checkRole,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};