import axios from 'axios';

// Simplificamos usando una sola URL base
const BASE_URL = 'http://localhost:8000/';
// eslint-disable-next-line no-unused-vars
const API_URL = `${BASE_URL}api/`;

// Configuración básica de axios
axios.defaults.withCredentials = false; // Cambiamos a false para evitar problemas de CORS

// Exportamos esta función para que pueda ser importada directamente
// Modificamos la función isAdminUser para que sea asíncrona
export const isAdminUser = async () => {
  // Simplemente devolvemos el valor almacenado en localStorage
  return localStorage.getItem('isAdminUser') === 'true';
};

const authService = {
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdminUser');
    localStorage.removeItem('userData');
  },
  
  // Login function - simplificada
  // En la función login, modificar la parte de la respuesta simulada:
  login: async (credentials) => {
    try {
      console.log('Intentando iniciar sesión con:', credentials);
      
      // Implementación temporal: simular inicio de sesión exitoso
      // Solo permitir acceso de administrador a usuarios específicos
      const isAdmin = credentials.username === 'admin' || credentials.username === 'superadmin';
      
      const mockResponse = {
        token: 'mock-token-12345',
        user: {
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          is_staff: isAdmin,
          role: isAdmin ? 'admin' : 
                credentials.username.includes('agent') ? 'agent' : 'client'
        }
      };
      
      // Guardar datos en localStorage
      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('userData', JSON.stringify(mockResponse.user));
      
      if (mockResponse.user.is_staff) {
        localStorage.setItem('isAdminUser', 'true');
      }
      
      console.log('Login simulado exitoso:', mockResponse);
      return mockResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Register function - simplificada
  // Añadir o modificar la función register para permitir la creación de usuarios administradores
  register: async (userData) => {
    try {
      console.log('Registrando usuario:', userData);
      
      // Verificar si es un registro de administrador (puedes usar un código secreto o campo especial)
      const isAdmin = userData.secretCode === 'ADMIN123';
      
      // Simulación de respuesta exitosa
      const mockResponse = {
        token: 'mock-token-register-12345',
        user: {
          id: Math.floor(Math.random() * 1000) + 2,
          username: userData.username,
          email: userData.email,
          is_staff: isAdmin,
          role: isAdmin ? 'admin' : 
                userData.role === 'agent' ? 'agent' : 'client'
        }
      };
      
      // Guardar datos en localStorage
      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('userData', JSON.stringify(mockResponse.user));
      
      if (mockResponse.user.is_staff) {
        localStorage.setItem('isAdminUser', 'true');
      }
      
      console.log('Registro simulado exitoso:', mockResponse);
      return mockResponse;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },
  
  // Obtener información del usuario actual
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  // Verificar si el usuario es administrador
  isAdmin: () => {
    return localStorage.getItem('isAdminUser') === 'true';
  }
};

export default authService;