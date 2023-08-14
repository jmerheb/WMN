import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Function that creates a dialog window when you want to add a new client
export default function NewClientDialog({open, close, setClientsUpdated, user}) {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");

  const submit = (evt) => {
    fetch(`/clients`, 
      {
          method: 'POST', 
          headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + user.authToken},
          body: JSON.stringify(
              {'name': name, 'number': number})
      })
      .then(response => response.json())
      .then(resp_obj => {
          let status = resp_obj.status;
          if (status === 'success') {
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
        <DialogTitle>Create a Client</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Enter the name and phone number for the client.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Client Name"
                       type="text" fullWidth variant="standard"
                       value={name} onChange={event => setName(event.target.value)}
            />
            <TextField autoFocus margin="dense" id="owner" label="Client phone number"
                       type="email" fullWidth variant="standard"
                       value={number} onChange={event => setNumber(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button sx={{color: '#0a0847'}} onClick={close}>Cancel</Button>
            <Button sx={{color: '#0a0847'}} onClick={submit}>Create</Button>
        </DialogActions>
    </Dialog>
  );
}