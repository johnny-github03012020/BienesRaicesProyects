import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdmin = () => {
      // Remove async since isAdmin() is not async anymore
      const admin = authService.isAdmin();
      setIsAdmin(admin);
      setLoading(false);
    };
    
    checkAdmin();
  }, []);
  
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }
  
  if (!authService.isAuthenticated() || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;