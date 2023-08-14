import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// Function made to list all clients
function generate(clientList,setSelectedClient) {
  return clientList.map((client, index) =>
    <ListItemButton key={index} onClick={() => setSelectedClient(client)}>
        <ListItemText
            primary={client.name}
            secondary={client.number}
        />
    </ListItemButton>,
);
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
export default function ClientList({clientList, setSelectedClient}) {   
  return (
    <List>
        {generate(clientList,setSelectedClient)} 
    </List>
 );
}