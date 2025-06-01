import React from 'react';
import { Toolbar as MuiToolbar } from '@mui/material';

const Toolbar = () => {
  return (
    <MuiToolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
        minHeight: '64px',
        backgroundColor: 'background.paper'
      }}
    />
  );
};

export default Toolbar;