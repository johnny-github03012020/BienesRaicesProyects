import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="main-content">
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <Link to="/propiedades" className="btn btn-secondary">
            <i className="fas fa-search"></i> Browse Properties
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;