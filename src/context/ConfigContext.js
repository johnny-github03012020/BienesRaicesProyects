import React, { createContext, useState, useContext } from 'react';

// Default configuration values
const defaultConfig = {
  authRequired: true,
  adminAccess: {
    enabled: true,
    showAdminLink: true,
    adminPath: '/admin'
  },
  imageProcessing: {
    keepOriginal: true,
    compressionLevel: 'medium',
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  apiEndpoints: {
    properties: 'http://localhost:8000/api/properties/',
    auth: 'http://localhost:8000/api/auth/'
  },
  formValidation: {
    strictMode: false,
    validateOnChange: true
  }
};

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);
  
  // Function to reset all configuration
  const resetConfig = () => {
    setConfig(defaultConfig);
    return defaultConfig;
  };
  
  // Function to update a specific configuration section
  const updateConfig = (section, values) => {
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        ...values
      }
    });
  };
  
  // Function to check if admin access should be shown
  const shouldShowAdminAccess = () => {
    const isAdmin = localStorage.getItem('isAdminUser') === 'true';
    return config.adminAccess.enabled && isAdmin && config.adminAccess.showAdminLink;
  };
  
  // Function to generate a system code based on current state
  const generateSystemCode = () => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    const environment = process.env.NODE_ENV === 'production' ? '2' : '1';
    const component = '10'; // Frontend
    const category = isAuthenticated ? '01' : '02'; // Auth or Properties
    const specificCode = isAuthenticated ? '001' : '002';
    
    return `${environment}${component}${category}${specificCode}`;
  };
  
  return (
    <ConfigContext.Provider 
      value={{ 
        config, 
        resetConfig, 
        updateConfig,
        generateSystemCode,
        shouldShowAdminAccess
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    console.error('useConfig must be used within a ConfigProvider');
  }
  return context || { 
    config: defaultConfig, 
    resetConfig: () => defaultConfig,
    updateConfig: () => {},
    generateSystemCode: () => '10020001',
    shouldShowAdminAccess: () => false
  };
};