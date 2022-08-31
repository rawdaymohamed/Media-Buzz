import * as React from 'react';
import { list } from './api-user';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Users = () => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 480,

          bgcolor: 'background.paper',
          mx: 'auto',
        }}
      >
        <Paper elevation={3} sx={{ px: 3, py: 2 }}>
          <Typography variant='h6' sx={{ pb: 2 }}>
            All Users
          </Typography>
          {users &&
            users.map((user) => {
              return (
                <ListItem key={user._id} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={`/users/${user._id}/profile/`}
                  >
                    <ListItemAvatar>
                      <Avatar alt={`${user.name} avatar`} />
                    </ListItemAvatar>
                    <ListItemText id={user._id} primary={`${user.name}`} />
                    <ArrowForwardIcon />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </Paper>
      </List>
    </>
  );
};
export default Users;
