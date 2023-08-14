import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';

// Function that creates a dialog window when you want to create a new group
export default function NewGroupDialog({open, close, showError, setGroupsUpdated, user}) {
  const [groupname, setGroupname] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const [version, setVersion] = useState(0);
  const [clientList, setClientList] = useState([]);

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

  const close2 = () =>{
    setGroupname("");
    setChecked([]);
    close();
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked); // delete later?
    setChecked(newChecked);
  };

  const submit = (evt) => {
    const memberReferences = checked.map(member => (
      clientList[member].id
    ));
    fetch(`/groups`, 
      {
          method: 'POST', 
          headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + user.authToken},
          body: JSON.stringify(
              {'groupname': groupname, 'members': memberReferences})
      })
      .then(response => response.json())
      .then(resp_obj => {
          let status = resp_obj.status;
          if (status === 'success') {
            setGroupsUpdated();
            close2();
          } else {
            console.log(resp_obj.data.message);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  return (
    <Dialog open={open} onClose={close2} >
        <DialogTitle>Create a Group</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Enter a group name.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="groupname" label="Group Name"
                       type="text" fullWidth variant="standard"
                       value={groupname} onChange={event => setGroupname(event.target.value)}
            />
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {clientList.map((client, value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={client.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
        </DialogContent>
        <DialogActions>
            <Button sx={{color: '#0a0847'}} onClick={close}>Cancel</Button>
            <Button sx={{color: '#0a0847'}} onClick={submit}>Create</Button>
        </DialogActions>
    </Dialog>
  );
}