import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  CssBaseline
} from '@mui/material';
import AdminNavbar from './layout/AdminNavbar';
import AdminSidebar from './admin/AdminSidebar';
import Toolbar from './layout/Toolbar';
import authService from '../services/authService';

const drawerWidth = 240;

const AdminPanel = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminNavbar onDrawerOpen={handleDrawerOpen} />
      <AdminSidebar open={open} onClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          marginLeft: open ? `${drawerWidth}px` : 0,
          transition: 'margin 0.2s',
          marginTop: '64px'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;