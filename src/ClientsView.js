import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NewClientDialog from './NewClientDialog';
import ClientList from './ClientList';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteClientDialog from './DeleteClientDialog';
import { Typography } from '@mui/material';

// Function made to organize Client section along with its buttons
export default function ClientsView({user, showError, selectedClient, setSelectedClient, notifyClientListUpdated}) {
  const [clientList, setClientList] = useState([]);
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [deleteClientOpen, setDeleteClientOpen] = useState(false);
  const [version, setVersion] = useState(0);

  const handleClickNewClientOpen = () => {
    setNewClientOpen(true);
  };
  const handleClickDeleteClientOpen = () => {
    setDeleteClientOpen(true);
  };
  useEffect(() => {
    fetch('/clients', {
       method: 'GET',
       headers: {'Authorization': 'Bearer ' + user.authToken}
    }).then(res => res.json()).then(response => {
      if (response.status === 'success') {
      setClientList(response.data.clients);
    }else {
      showError(response.data.message);
    }
    });
  }, [user,version]);

  const setClientsUpdated = () => {
    setVersion(version + 1);
    notifyClientListUpdated();
  }

  return (
    <>
      <Container maxWidth="lg" >
        <Fab sx={{bgcolor: '#470835'}} size="small" color="primary" aria-label="add" variant="extended" onClick={handleClickNewClientOpen}>
          <AddIcon sx={{ mr: 1 }} />
          New Client
        </Fab>
        <Fab sx={{bgcolor: '#470835'}} size="small" color="primary" aria-label="add" variant="extended" onClick={handleClickDeleteClientOpen}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Client
        </Fab>
        <Box sx={{height: '100%'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Clients
          </Typography>
          <ClientList clientList={clientList} setSelectedClient={setSelectedClient}/>
        </Box>
      </Container>
      <NewClientDialog open={newClientOpen} 
                        close={() => setNewClientOpen(false)} user={user}
                        setClientsUpdated={setClientsUpdated} />
      <DeleteClientDialog open={deleteClientOpen} 
                        close={() => setDeleteClientOpen(false)} user={user} client={selectedClient}
                        setDeleteClientOpen={() => setVersion(version + 1)} setClientsUpdated={setClientsUpdated} /> 
    </>);
}
