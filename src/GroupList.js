import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// Function made to list all clients
function generate(groupList,setSelectedGroup) {
  return groupList.map((group, index) =>
    <ListItemButton key={index} onClick={() => setSelectedGroup(group)}>
        <ListItemText
            primary={group.groupname}
        />
    </ListItemButton>,
);
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function GroupList({groupList, setSelectedGroup}) {   
  return (
    <List>
        {generate(groupList,setSelectedGroup)} 
    </List>
 );
}