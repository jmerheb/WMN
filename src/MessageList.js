import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import NewMessageDialog from './NewMessageDialog';

// Function made to list the messages of a selected client
export default function MessageList({user, selectedClient}) {
    const [messageList, setMessageList] = useState([]);
    const [newMessageOpen, setNewMessageOpen] = useState(false);
    const [version, setVersion] = useState(0);

    const handleListItemClick = (event, messageId) => {}; 

    const handleClickNewMessageOpen = () => {
    setNewMessageOpen(true);
    };
    
    useEffect(() => {
      fetch(`/messages/${selectedClient.id}`, {
        headers: {'Authorization': 'Bearer ' + user.authToken}
      }).then(res => res.json()).then(response => {
        setMessageList(response.data.messages);
      })
    }, [version,selectedClient]);
    
    return (
      <div>
          <Fab sx={{bgcolor: '#470835'}} size="small" color="primary" aria-label="add" variant="extended" onClick={handleClickNewMessageOpen}>
            <SendIcon sx={{ mr: 1 }} />
            Message Client
          </Fab>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedClient.name}
          </Typography>
          <NewMessageDialog open={newMessageOpen} user={user} client={selectedClient}
                    close={() => setNewMessageOpen(false)} 
                    setMessagesUpdated={() => setVersion(version + 1)} />
          <List aria-label="Messages">
          {
            messageList.map((mesz, id) => {
            return (
              <div>
                  <ListItem key={id} onClick={(event) => handleListItemClick(event, mesz)}>
                      <ListItemText primary={mesz.message}
                                     secondary = {mesz.ts}/>
                  </ListItem>
              </div>
            );
          })
        }
          </List>
      </div>
  );
}