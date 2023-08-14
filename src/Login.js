import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Function made to organize the log in page
export default function Login({loginUser, cancelLogin}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState(null);

  function loginClickHandler(event) {
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(response => response.json())
    .then(respObj => {
      if (respObj.status == "success") {
      loginUser(username, respObj.data.authToken);
      }else if (respObj.status == "fail") {
        setErrorMsg(respObj.message);
      }
            
    });
  }

  return (
    <>
    <AppBar position="static">
        <Toolbar sx={{bgcolor: '#0a0847'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WMP Login
          </Typography>
          <Button color="inherit" onClick={cancelLogin}>Cancel</Button>
        </Toolbar>
      </AppBar>
    <Box 
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={1}>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button sx={{bgcolor: '#0a0847'}} variant="contained" onClick={loginClickHandler}>Log In</Button>
      {errorMsg != null ? <Alert severity="error">{errorMsg}</Alert> : null}
      </Stack>
    </Box>
    </>
  );
}