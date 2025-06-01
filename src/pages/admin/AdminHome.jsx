import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import {
  Business as BusinessIcon,
  Campaign as CampaignIcon,
  People as PeopleIcon,
  Apartment as ApartmentIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, icon: Icon }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 2,
      '&:hover': {
        transform: 'translateY(-5px)',
        transition: 'transform 0.3s ease-in-out'
      }
    }}
  >
    <Icon sx={{ fontSize: 40, color: '#4CAF50', mb: 2 }} />
    <Typography variant="h6" component="h2" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" component="p" color="primary">
      {value}
    </Typography>
  </Paper>
);

const AdminHome = () => {
  const stats = [
    { title: 'Propiedades Activas', value: '24', icon: BusinessIcon },
    { title: 'Anuncios Publicados', value: '12', icon: CampaignIcon },
    { title: 'Usuarios Registrados', value: '156', icon: PeopleIcon },
    { title: 'Modelos de Página', value: '8', icon: ApartmentIcon }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome;