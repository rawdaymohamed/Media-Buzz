import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth-helper';
import { read } from './api-user';
import {
  Divider,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  const [redirectToSignin, setRedirectToSignin] = React.useState(false);
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = isAuthenticated();

    read(id, jwt, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [id]);
  if (redirectToSignin) return <Navigate to='/signin' />;

  return (
    <>
      {user && (
        <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', padding: 3 }}>
          <Typography variant='h6'>Profile</Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={`${user.name} profile`} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {isAuthenticated().user &&
                isAuthenticated().user._id == user._id && (
                  <ListItemSecondaryAction>
                    {
                      <IconButton
                        to={`/users/${user._id}/edit`}
                        component={RouterLink}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                    {
                      <IconButton
                        to={`/users/${user._id}/delete`}
                        component={RouterLink}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  </ListItemSecondaryAction>
                )}
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemText
                primary={'Joined: ' + new Date(user.created).toDateString()}
              />
            </ListItem>
          </List>
        </Paper>
      )}
    </>
  );
};
export default Profile;
