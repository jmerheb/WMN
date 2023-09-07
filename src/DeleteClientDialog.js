import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Function that creates a dialog window when you want to delete a client
export default function DeleteClientDialog({open, close, setDeleteClientOpen, user, client, setClientsUpdated}) {
  const [version, setVersion] = useState(0);

  const submit = (evt) => {
    fetch(`/clients/${client.id}`, 
      {
          method: 'DELETE', 
          headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + user.authToken}
      })
      .then(response => response.json())
      .then(resp_obj => {
          let status = resp_obj.status;
          if (status === 'success') {
            setDeleteClientOpen();
            setVersion(version + 1);
            setClientsUpdated();
            close();
          } else {
            console.log(resp_obj.data.message);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  return (
    <Dialog open={open} onClose={close} >
        <DialogTitle>Delete a Client</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Are you sure you want to delete this client? 
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button sx={{color: '#0a0847'}} onClick={close}>Cancel</Button>
            <Button sx={{color: '#0a0847'}} onClick={submit}>Delete</Button>
        </DialogActions>
    </Dialog>
  );
}