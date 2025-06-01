import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/utils/ScrollToTop';
import './assets/styles/App.css';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import PropertyList from './pages/admin/PropertyList';
import PropertyCreate from './pages/PropertyCreate';
import PropertyEdit from './pages/PropertyEdit';
import AdManagement from './pages/admin/AdManagement';

// Auth components
import Login from './pages/Login';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedades/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rutas de administración (protegidas) */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/properties" element={
              <PrivateRoute>
                <PropertyList />
              </PrivateRoute>
            } />
            <Route path="/admin/properties/create" element={
              <PrivateRoute>
                <PropertyCreate />
              </PrivateRoute>
            } />
            <Route path="/admin/properties/edit/:id" element={
              <PrivateRoute>
                <PropertyEdit />
              </PrivateRoute>
            } />
            <Route path="/admin/ads" element={
              <PrivateRoute>
                <AdManagement />
              </PrivateRoute>
            } />
            
            {/* Ruta 404 - debe estar al final */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ConfigProvider>
  );
}

export default App;