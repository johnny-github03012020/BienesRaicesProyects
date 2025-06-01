import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            Bienes Raices
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/properties" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                Propiedades
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                Contacto
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/properties" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;