// src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          TrailMate
        </Typography>
        <Button color="inherit" href="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
