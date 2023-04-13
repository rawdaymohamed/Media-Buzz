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
import FollowUserButton from './FollowUserButton';
import ProfileTabs from './ProfileTabs';
import ErrorIcon from '@mui/icons-material/Error';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({ following: [], followers: [] });
  const [following, setFollowing] = React.useState(false);
  const [redirectToSignin, setRedirectToSignin] = React.useState(false);
  const [error, setError] = React.useState(null);
  const photoUrl = `/api/users/${id}/photo`;
  const jwt = isAuthenticated();
  const checkFollow = (user) => {
    const match = user.followers.some(
      (follower) => jwt.user._id == follower._id
    );
    return match;
  };
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(id, jwt, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else if (data) {
        setUser(data);
        const checkFollowing = checkFollow(data);
        setFollowing(checkFollowing);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [id, jwt]);

  const clickFollowButton = (callApi) => {
    callApi(jwt.user._id, jwt, user._id).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setUser(data);
        setFollowing(!following);
      }
    });
  };
  if (redirectToSignin) return <Navigate to='/signin' />;

  return (
    <>
      {user && (
        <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', padding: 3 }}>
          <Typography variant='h5'>Profile</Typography>
          <List dense>
            <ListItem sx={{ mb: 2 }}>
              <ListItemAvatar>
                <Avatar
                  alt={`${user.name} profile`}
                  src={photoUrl}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {isAuthenticated().user &&
              isAuthenticated().user._id == user._id ? (
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
              ) : (
                <FollowUserButton
                  following={following}
                  onButtonClick={clickFollowButton}
                />
              )}
            </ListItem>

            <Divider />
            {user.about && (
              <ListItem>
                <ListItemText primary={user.about} />
              </ListItem>
            )}
            <ListItem>
              <ListItemText
                primary={'Joined: ' + new Date(user.created).toDateString()}
              />
            </ListItem>
          </List>
          <Divider />

          <ProfileTabs 
            user={user}
          />
          {error && (
            <Typography
              component='p'
              color='error'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ErrorIcon color='error' sx={{ mr: '3px' }}>
                error
              </ErrorIcon>
              {error}
            </Typography>
          )}
        </Paper>
      )}
    </>
  );
};
export default Profile;
