import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Box,
  Collapse,
  ListItemButton
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  Campaign as CampaignIcon,
  People as PeopleIcon,
  Apartment as ApartmentIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  List as ListIcon,
  MonetizationOn as MonetizationOnIcon,
  Category as CategoryIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleSubMenuClick = (menuId) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin'
    },
    {
      id: 'properties',
      text: 'Propiedades',
      icon: <BusinessIcon />,
      subItems: [
        { text: 'Lista de Propiedades', icon: <ListIcon />, path: '/admin/propiedades' },
        { text: 'Agregar Propiedad', icon: <AddIcon />, path: '/admin/propiedades/nueva' },
        { text: 'Categorías', icon: <CategoryIcon />, path: '/admin/propiedades/categorias' }
      ]
    },
    {
      id: 'ads',
      text: 'Publicidad',
      icon: <CampaignIcon />,
      subItems: [
        { text: 'Anuncios Activos', icon: <ListIcon />, path: '/admin/anuncios' },
        { text: 'Nuevo Anuncio', icon: <AddIcon />, path: '/admin/anuncios/nuevo' },
        { text: 'Espacios Publicitarios', icon: <MonetizationOnIcon />, path: '/admin/anuncios/espacios' }
      ]
    },
    {
      id: 'users',
      text: 'Usuarios',
      icon: <PeopleIcon />,
      subItems: [
        { text: 'Lista de Usuarios', icon: <ListIcon />, path: '/admin/usuarios' },
        { text: 'Agregar Usuario', icon: <AddIcon />, path: '/admin/usuarios/nuevo' }
      ]
    },
    {
      id: 'templates',
      text: 'Modelos de Página',
      icon: <ApartmentIcon />,
      subItems: [
        { text: 'Lista de Modelos', icon: <ListIcon />, path: '/admin/modelos' },
        { text: 'Nuevo Modelo', icon: <AddIcon />, path: '/admin/modelos/nuevo' }
      ]
    },
    {
      id: 'settings',
      text: 'Configuración',
      icon: <SettingsIcon />,
      path: '/admin/configuracion'
    }
  ];

  const renderMenuItem = (item) => {
    if (item.subItems) {
      return (
        <React.Fragment key={item.id}>
          <ListItem button onClick={() => handleSubMenuClick(item.id)}>
            <ListItemIcon sx={{ color: '#4CAF50' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {openSubMenus[item.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openSubMenus[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem, index) => (
                <ListItemButton
                  key={index}
                  sx={{ pl: 4 }}
                  onClick={() => navigate(subItem.path)}
                >
                  <ListItemIcon sx={{ color: '#4CAF50' }}>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem button key={item.id} onClick={() => navigate(item.path)}>
        <ListItemIcon sx={{ color: '#4CAF50' }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          ...(open ? { width: drawerWidth } : { width: theme => theme.spacing(7) })
        }
      }}
      open={open}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map(item => renderMenuItem(item))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;