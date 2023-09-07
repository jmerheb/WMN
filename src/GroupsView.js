import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NewGroupDialog from './NewGroupDialog';
import DeleteGroupDialog from './DeleteGroupDialog';
import GroupList from './GroupList';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';

// Function made to organize Group section along with its buttons
export default function GroupsView({user, showError, selectedGroup, setSelectedGroup, clientListVersion}) {
  const [groupList, setGroupList] = useState([]);
  const [newGroupOpen, setNewGroupOpen] = useState(false);
  const [deleteGroupOpen, setDeleteGroupOpen] = useState(false);
  const [version, setVersion] = useState(0);

  const handleClickNewGroupOpen = () => {
    setNewGroupOpen(true);
  };
  const handleClickDeleteGroupOpen = () => {
    setDeleteGroupOpen(true);
  };
  useEffect(() => {
    fetch('/groups', { 
       method: 'GET',
       headers: {'Authorization': 'Bearer ' + user.authToken}
    }).then(res => res.json()).then(response => {
      if (response.status === 'success') {
      setGroupList(response.data.groups);
    }else {
      showError(response.data.message);
    }
    });
  }, [user,version]);

  return (
    <>
      <Container maxWidth="lg" >
        <Fab sx={{bgcolor: '#0a0847'}} size="small" color="primary" aria-label="add" variant="extended" onClick={handleClickNewGroupOpen}>
          <AddIcon sx={{ mr: 1 }} />
          New Group
        </Fab>
        <Fab sx={{bgcolor: '#0a0847'}} size="small" color="primary" aria-label="add" variant="extended" onClick={handleClickDeleteGroupOpen}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Group
        </Fab>
        <Box sx={{height: '100%'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Groups
          </Typography>
          <GroupList groupList={groupList} setSelectedGroup={setSelectedGroup}/>
        </Box>
      </Container>
      <NewGroupDialog open={newGroupOpen} 
                        close={() => setNewGroupOpen(false)} user={user}
                        setGroupsUpdated={() => setVersion(version + 1)} clientListVersion={clientListVersion} />
      <DeleteGroupDialog open={deleteGroupOpen} 
                        close={() => setDeleteGroupOpen(false)} user={user} group={selectedGroup}
                        setDeleteGroupOpen={() => setVersion(version + 1)} /> 
    </>);
}