import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Function that organzes the welcoming screen
export default function ProgressWelcome(props) {
    const setViewFcn = props.onClickLogin;
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{bgcolor: '#0a0847'}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WMP
            </Typography>
            <Button color="inherit" onClick={evt => setViewFcn("login")}>Login</Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h2" textAlign="center" mt={10}>
          Welcome!
        </Typography>
      </Box>
    );
  }
  