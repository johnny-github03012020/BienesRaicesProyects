import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Campaign as CampaignIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import styles from './AdminNavbar.module.css';

const AdminNavbar = ({ onDrawerOpen }) => {
  const [anchorEls, setAnchorEls] = useState(Array(menuItems.length).fill(null));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const menuItems = [
  { 
    label: "Propiedades",
    icon: <HomeIcon />,
    submenu: [
      { label: "Ventas", path: "/admin/properties/sales" },
      { label: "Alquiler", path: "/admin/properties/rentals" },
      { label: "Histórico", path: "/admin/properties/history" },
    ]
  },
  {
    label: "Usuarios",
    icon: <PeopleIcon />,
    submenu: [
      { label: "Lista de Usuarios", path: "/admin/users" },
      { label: "Asignar Roles", path: "/admin/users/roles" },
    ]
  },
  {
    label: "Plantillas",
    icon: <DescriptionIcon />,
    submenu: [
      { label: "Editor de Plantillas", path: "/admin/templates" },
      { label: "Configurar SEO", path: "/admin/templates/seo" },
    ]
  },
  {
    label: "Anuncios",
    icon: <CampaignIcon />,
    submenu: [
      { label: "Nuevo Anuncio", path: "/admin/ads/create" },
      { label: "Estadísticas", path: "/admin/ads/analytics" },
    ]
  }
];

const AdminNavbar = () => {
  const [anchorEls, setAnchorEls] = useState(Array(menuItems.length).fill(null));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="fixed" className={styles.adminNavbar}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onDrawerOpen}
          className={styles.menuButton}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box className={`${styles.menuContainer} ${isMobile && mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {menuItems.map((item, index) => (
            <div key={item.label} className={styles.menuItem}>
              <Box
                onClick={(e) => handleClick(e, index)}
                className={styles.menuButton}
              >
                {item.icon}
                <Typography variant="subtitle1" className={styles.menuLabel}>
                  {item.label}
                </Typography>
              </Box>
              <Menu
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleClose(index)}
                className={styles.submenu}
              >
                {item.submenu.map((subItem) => (
                  <MenuItem
                    key={subItem.path}
                    component={Link}
                    to={subItem.path}
                    onClick={() => handleClose(index)}
                    className={styles.submenuItem}
                  >
                    {subItem.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

};

export default AdminNavbar;