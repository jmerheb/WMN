import * as React from 'react';
import ProgressAppBar from './ProgressAppBar';
import Container from '@mui/material/Container';
import ProgressWelcome from './ProgressWelcome';
import './App.css';
import Login from './Login';
import ClientsView from './ClientsView';
import ErrorAlert from './ErrorAlert';
import MessageList from './MessageList';
import GroupMessageList from './GroupMessageList';
import { Grid } from '@mui/material';
import GroupsView from './GroupsView';

// Main funcion that organizes the page
export default function App() {
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [view, setView] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    if (storedUser != null) {
      setUser({'username':storedUser, 'authToken':storedToken});
      setView("main");
    }
  }, []);

  function loginUser(username,authToken) {
    localStorage.setItem("user", username);
    localStorage.setItem("authToken", authToken);
    setUser({'username':username, 'authToken':authToken});
    setView("main");
  }

  function cancelLogin() {
    setView(null);
  }

  function doLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    setView(null);
  }
  
  function showError(message) {
    setErrorMessage(message);
    setErrorOpen(true);
  }

/* logical-expression ? value-if-true : value-if-false */
  if (view == "login") {
    return <Login loginUser={loginUser} cancelLogin={cancelLogin}/>
  } else if (view == "main" && user != null) {
    return (
       <div>
      <ProgressAppBar handleLogout={doLogout}/>
      <Container maxWidth="xl" >
       
    <Grid container direction={"row"} wrap='nowrap' flexGrow={2}>
        <Grid container lg={3}>
          <GroupsView 
            user={user} lg={3} 
            showError={showError}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}/>
             </Grid>
        <Grid container lg={3}>
          {selectedGroup != null ? <GroupMessageList user={user} selectedGroup={selectedGroup}/> : null} 
             </Grid>
        <Grid container lg={3}>
          <ClientsView 
             user={user} lg={3} 
             showError={showError}
             selectedClient={selectedClient}
             setSelectedClient={setSelectedClient}/>
             </Grid>
        <Grid container lg={3}>
          {selectedClient != null ? <MessageList user={user} selectedClient={selectedClient}/> : null} 
          </Grid>
      </Grid>   
      </Container>
      <ErrorAlert open={errorOpen} handleClose={() => setErrorOpen(false)} errorMessage={errorMessage} />
    </div> 
    );
  } else {
    return <ProgressWelcome onClickLogin={() => setView("login")}/>
  }
}
