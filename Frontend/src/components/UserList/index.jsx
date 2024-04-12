import React, { useState, useEffect } from 'react';
import { firebase } from '../../firebase/config';
import { Box, List, ListItem, ListItemText, Avatar, Button } from '@mui/material';

function UsersList({ onEditUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('users').onSnapshot(snapshot => {
        const usersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsers(usersData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
        <List>
            {users.map(user => (
            <ListItem key={user.id} alignItems="flex-start" secondaryAction={
                <Button variant="contained" onClick={() => onEditUser(user)}>Editar</Button>
            }>
                <Avatar alt={user.nome} src={user.fotoPerfil} sx={{ marginRight: 2 }} />
                <ListItemText
                primary={`${user.nome} ${user.sobrenome}`}
                secondary={`Cargo: ${user.cargo}`}
                />
            </ListItem>
            ))}
        </List>
        </Box>
    );
}

export default UsersList;