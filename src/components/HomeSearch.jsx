import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/HomeSearch.css';

const HomeSearch = () => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    // Añadimos un pequeño retraso para permitir que la animación se complete
    setTimeout(() => {
      navigate('/propiedades');
    }, 100);
  };

  return (
    <div className="home-search">
      <button 
        onClick={handleClick} 
        className="btn btn-primary"
      >
        Buscar Propiedades
      </button>
    </div>
  );
};

export default HomeSearch;