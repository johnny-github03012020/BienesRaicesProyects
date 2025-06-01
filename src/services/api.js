import axios from 'axios';

// Configuración de la URL base de la API
// Cambiamos a una URL relativa para evitar problemas de CORS en producción
const API_URL = '/api';

// Configuración de axios con opciones adicionales para mejor manejo de errores
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // Timeout de 10 segundos
});

// Interceptor para manejar errores de forma global
api.interceptors.response.use(
  response => response,
  error => {
    // Manejo centralizado de errores
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicio para propiedades
export const PropertyService = {
  // Obtener todas las propiedades
  getAllProperties: async () => {
    try {
      const response = await api.get('/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  // Obtener una propiedad por ID
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property with id ${id}:`, error);
      throw error;
    }
  },

  // Filtrar propiedades
  filterProperties: async (filters) => {
    try {
      const response = await api.get('/properties', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error filtering properties:', error);
      throw error;
    }
  }
};

// Servicio para consultas
export const InquiryService = {
  // Enviar una consulta
  sendInquiry: async (inquiryData) => {
    try {
      const response = await api.post('/inquiries', inquiryData);
      return response.data;
    } catch (error) {
      console.error('Error sending inquiry:', error);
      throw error;
    }
  }
};

export default api;