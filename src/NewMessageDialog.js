import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Function that creates a dialog window when you want send a message to a client
export default function NewMessageDialog({open, close, setMessagesUpdated, user, client}) {
  const [textMessage, setTextMessage] = React.useState("");

  const submit = (evt) => {
    fetch(`/messages`, 
      {
          method: 'POST', 
          headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + user.authToken},
          body: JSON.stringify(
              {'receiver': client.id, 'textMessage': textMessage})
      })
      .then(response => response.json())
      .then(resp_obj => {
          let status = resp_obj.status;
          if (status === 'success') {
            setMessagesUpdated();
          } else {
            console.log(resp_obj.data.message);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      close();
  }

  return (
    <Dialog open={open} onClose={close} >
        <DialogTitle>Create a Message</DialogTitle>
        <DialogContent>
            <TextField autoFocus margin="dense" id="text" label="Text message"
                       type="text" fullWidth variant="standard"
                       value={textMessage} onChange={event => setTextMessage(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button sx={{color: '#0a0847'}} onClick={close}>Cancel</Button>
            <Button sx={{color: '#0a0847'}} onClick={submit}>Create</Button>
        </DialogActions>
    </Dialog>
  );
}