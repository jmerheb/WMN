import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import NewGroupMessageDialog from './NewGroupMessageDialog';
    
// Function made to list the messages of a selected group
export default function GroupMessageList({user, selectedGroup}) {
    const [messageList, setMessageList] = useState([]);
    const [newGroupMessage, setNewGroupMessage] = useState(false);
    const [version, setVersion] = useState(0);

    const handleListItemClick = (event, messageId) => {}; 

    const handleClickNewGroupMessage = () => {
      setNewGroupMessage(true);
    };
    
    useEffect(() => {
      fetch(`/groups/messages/${selectedGroup.id}`, {
        headers: {'Authorization': 'Bearer ' + user.authToken}
      }).then(res => res.json()).then(response => {
        setMessageList(response.data.messages);
      })
    }, [version,selectedGroup]);
    
    return (
      <div>
          <Fab sx={{bgcolor: '#0a0847'}} size="small" color="primary" aria-label="add" variant="extended" onClick={handleClickNewGroupMessage}>
            <SendIcon sx={{ mr: 1 }} />
            Message Group
          </Fab>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedGroup.groupname}
          </Typography>
          <NewGroupMessageDialog open={newGroupMessage} 
                        close={() => setNewGroupMessage(false)} user={user} group={selectedGroup}
                        setGroupMessageUpdated={() => setVersion(version + 1)} /> 
          <List aria-label="Group Messages">
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