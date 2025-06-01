const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de ejemplo para propiedades
app.get('/api/properties', (req, res) => {
  // Aquí normalmente consultarías tu base de datos
  const properties = [
    {
      id: 1,
      title: "Apartamento con vista al mar",
      price: 1200,
      operationType: "alquiler",
      location: "Playa",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      propertyType: "apartamento",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Estudio céntrico renovado",
      price: 650,
      operationType: "alquiler",
      location: "Centro",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      propertyType: "estudio",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  res.json(properties);
});

// Ruta para obtener una propiedad específica
app.get('/api/properties/:id', (req, res) => {
  const propertyId = parseInt(req.params.id);
  // Aquí normalmente consultarías tu base de datos
  const property = {
    id: propertyId,
    title: "Apartamento con vista al mar",
    price: 1200,
    operationType: "alquiler",
    location: "Playa",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    propertyType: "apartamento",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Hermoso apartamento con vista al mar, completamente amueblado y con acceso directo a la playa."
  };
  
  res.json(property);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});