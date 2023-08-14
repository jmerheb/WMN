import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Function that organizes the top bar of the screen
export default function ProgressAppBar({handleLogout}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{bgcolor: '#0a0847'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           WMN
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>  
        </Toolbar>
      </AppBar>
    </Box>
  );
}