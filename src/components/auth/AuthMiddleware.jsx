import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import jwtAuthService from '../../services/jwtAuthService';

const AuthMiddleware = ({ children, requiredPermissions = [], requiredRoles = [] }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Verificar si el token es válido
        const isValid = await jwtAuthService.verifyToken();
        if (!isValid) {
          setIsAuthorized(false);
          setIsVerifying(false);
          return;
        }

        // Verificar permisos si se requieren
        if (requiredPermissions.length > 0) {
          const permissionPromises = requiredPermissions.map(permission =>
            jwtAuthService.hasPermission(permission)
          );
          const permissionResults = await Promise.all(permissionPromises);
          if (!permissionResults.every(result => result)) {
            setIsAuthorized(false);
            setIsVerifying(false);
            return;
          }
        }

        // Verificar roles si se requieren
        if (requiredRoles.length > 0) {
          const rolePromises = requiredRoles.map(role =>
            jwtAuthService.hasRole(role)
          );
          const roleResults = await Promise.all(rolePromises);
          if (!roleResults.every(result => result)) {
            setIsAuthorized(false);
            setIsVerifying(false);
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Error de autenticación:', error);
        setIsAuthorized(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [requiredPermissions, requiredRoles]);

  if (isVerifying) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    // Guardar la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthMiddleware;