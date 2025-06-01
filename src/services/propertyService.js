// eslint-disable-next-line no-unused-vars
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const API_URL = 'http://localhost:8000/api/';

// Helper function to get auth header
// eslint-disable-next-line no-unused-vars
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Token ${token}` } : {};
};

// Función auxiliar para obtener todas las propiedades del localStorage
const getAllPropertiesFromStorage = async () => {
  const storedProperties = localStorage.getItem('properties');
  return storedProperties ? JSON.parse(storedProperties) : [];
};

// Función para inicializar el almacenamiento local con datos de ejemplo si está vacío
const initializeLocalStorage = () => {
  const storedProperties = localStorage.getItem('properties');
  if (!storedProperties) {
    const initialProperties = [
      {
        id: 1,
        title: 'Apartamento Alexa VI',
        description: 'Hermoso apartamento con vista al mar',
        price: 8000000,
        location: 'Urbanizacion Tropical, 7 1/2 Carret. Sanchez',
        bedrooms: 3,
        bathrooms: 0,
        area: 77,
        image: '/images/property1.jpg',
        featured: true
      },
      {
        id: 2,
        title: 'Edificio Osiris',
        description: 'Edificio comercial en zona céntrica',
        price: 500000,
        location: 'Ensanche la Paz, Santo Domingo, R. D.',
        bedrooms: 0,
        bathrooms: 0,
        area: 300,
        image: '/images/property2.jpg',
        featured: true
      }
    ];
    localStorage.setItem('properties', JSON.stringify(initialProperties));
    console.log('Initialized localStorage with sample properties');
  }
};

// First, let's fix the syntax error in the propertyService.js file
const propertyService = {
  // Get all properties
  getAllProperties: async () => {
    try {
      // Initialize localStorage if needed
      initializeLocalStorage();
      
      // Get properties from localStorage
      const properties = await getAllPropertiesFromStorage();
      return properties;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },
  
  // Get property by ID
  getPropertyById: async (id) => {
    try {
      // Initialize localStorage if needed
      initializeLocalStorage();
      
      // Get property from localStorage
      const allProperties = await getAllPropertiesFromStorage();
      const property = allProperties.find(p => p.id === parseInt(id));
      
      if (!property) {
        throw new Error('Property not found');
      }
      return property;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },
  
  // Create new property
  createProperty: async (propertyData) => {
    try {
      // Uncomment this code when backend is ready:
      /*
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      };
      
      const response = await axios.post(`${API_URL}properties/`, propertyData, { headers });
      return response.data;
      */
      
      // For now, just log and return mock data
      console.log('Creating property with data:', propertyData);
      return {
        id: 3,
        ...propertyData
      };
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },
  
  // Update property
  updateProperty: async (id, propertyData) => {
    try {
      console.log('Updating property with data:', propertyData);
      
      // Crear una copia para no modificar el original
      const updatedData = { ...propertyData };
      let imageUrl = null;
      
      // Manejar la imagen según su tipo
      if (updatedData.image instanceof File) {
        // Para desarrollo, convertimos el archivo a una cadena base64
        // Esto permite que la imagen persista en localStorage
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(updatedData.image);
        });
        console.log('Converted image to base64 data URL');
      } else if (typeof updatedData.image === 'string') {
        // Si ya es una cadena (URL o base64), usarla directamente
        imageUrl = updatedData.image;
      }
      
      // Inicializar localStorage si es necesario
      initializeLocalStorage();
      
      // Actualizar los datos en localStorage para persistencia
      const allProperties = await getAllPropertiesFromStorage();
      const propertyIndex = allProperties.findIndex(p => p.id === parseInt(id));
      
      if (propertyIndex !== -1) {
        allProperties[propertyIndex] = {
          ...allProperties[propertyIndex],
          ...updatedData,
          id: parseInt(id),
          image: imageUrl,
          price: typeof updatedData.price === 'string' ? parseInt(updatedData.price) : updatedData.price
        };
        
        localStorage.setItem('properties', JSON.stringify(allProperties));
        console.log('Updated properties in localStorage');
      } else {
        console.warn(`Property with ID ${id} not found in localStorage`);
      }
      
      // Devolver los datos actualizados
      return {
        ...updatedData,
        id: parseInt(id),
        image: imageUrl
      };
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },
  
  // Delete property
  deleteProperty: async (id) => {
    try {
      // Uncomment this code when backend is ready:
      /*
      const headers = {
        ...getAuthHeader()
      };
      
      await axios.delete(`${API_URL}properties/${id}/`, { headers });
      return true;
      */
      
      // For now, just log
      console.log(`Deleting property ${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  },
  
  // Get featured properties
  getFeaturedProperties: async () => {
    try {
      // Initialize localStorage if needed
      initializeLocalStorage();
      
      // Get properties from localStorage and filter featured ones
      const allProperties = await getAllPropertiesFromStorage();
      const featuredProperties = allProperties.filter(property => property.featured);
      
      return featuredProperties;
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      throw error;
    }
  }
};

export default propertyService;