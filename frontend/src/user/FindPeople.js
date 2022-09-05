import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { findPeople } from './api-user';
import ListItemButton from '@mui/material/ListItemButton';
import { Link as RouterLink } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth-helper';
import { read, follow, unfollow } from './api-user';
import NotFound from '../core/NotFound';
import { Button } from '@mui/material';

const FindPeople = () => {
  const jwt = isAuthenticated();

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const id = jwt.user._id;
    if (id) {
      read(id, jwt).then((data) => {
        if (data && data.error) setError(data);
        if (data) setUser(data);
      });
    }

    findPeople(id, jwt, signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
        console.log(error);
      } else if (data) setUsers(data);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [jwt, error, users]);

  const checkFollowing = (userId) => {
    if (user) {
      const following = user.following.some((fId) => userId === fId);
      return following;
    }
    return false;
  };

  const clickButton = (fId) => {
    follow(jwt.user._id, jwt, fId).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        setError(data.error);
      } else if (data) {
        setUser(data);
      }
    });
  };
  return (
    <>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 480,

          bgcolor: 'background.paper',
        }}
      >
        <Paper elevation={3} sx={{ px: 3, py: 2, m: 3 }}>
          <Typography variant='h6' sx={{ pb: 2 }}>
            People to Follow
          </Typography>
          {users.length > 0
            ? users.map((u) => {
                return (
                  <ListItem key={u._id} disablePadding>
                    <ListItemButton
                      component={RouterLink}
                      to={`/users/${u._id}/profile/`}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={`${u.name} avatar`}
                          src={`/api/users/${u._id}/photo`}
                        />
                      </ListItemAvatar>
                      <ListItemText id={u._id} primary={`${u.name}`} />
                    </ListItemButton>
                    <Button onClick={() => clickButton(u._id)}>Follow</Button>
                  </ListItem>
                );
              })
            : 'No users to follow'}
        </Paper>
      </List>
    </>
  );
};
export default FindPeople;
