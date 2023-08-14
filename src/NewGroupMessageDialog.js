import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Function that creates a dialog window when you want send a message to a group
export default function NewGroupMessageDialog({open, close, setGroupMessageUpdated, user, group}) {
  const [groupMessage, setGroupMessage] = React.useState("");

  const submit = (evt) => {
    fetch(`/groupmessage`, 
      {
          method: 'POST', 
          headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + user.authToken},
          body: JSON.stringify(
              {'groupId': group.id, 'groupMessage': groupMessage})
      })
      .then(response => response.json())
      .then(resp_obj => {
          let status = resp_obj.status;
          if (status === 'success') {
            setGroupMessageUpdated();
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
            
            <TextField autoFocus margin="dense" id="text" label="group message"
                       type="text" fullWidth variant="standard"
                       value={groupMessage} onChange={event => setGroupMessage(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button sx={{color: '#0a0847'}} onClick={close}>Cancel</Button>
            <Button sx={{color: '#0a0847'}} onClick={submit}>Create</Button>
        </DialogActions>
    </Dialog>
  );
}