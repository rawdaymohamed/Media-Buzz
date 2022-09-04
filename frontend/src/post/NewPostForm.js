import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  FormControl,
  CardActions,
  TextField,
  CardHeader,
  Avatar,
} from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import apiPost from './api-post';
import { isAuthenticated } from '../auth/auth-helper';
const NewPostForm = ({ user }) => {
  const [postText, setPostText] = useState('');
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState('');

  const jwt = isAuthenticated();
  const addPost = (e) => {
    e.preventDefault();
    const postData = new FormData();
    postText && postData.append('text', postText);
    photo && postData.append('photo', photo);
    if (jwt) {
      apiPost.createPost(jwt.user._id, jwt, postData).then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          setError('');
          setPostText('');
          setPhoto('');
        }
      });
    }
  };
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
      <div>
        <CardHeader
          avatar={
            <Avatar
              src={user._id && `/api/users/${user._id}/photo`}
              alt={`${user.name} photo`}
            />
          }
          title={user.name && `${user.name}`}
          sx={{ backgroundColor: '#e0e0e0' }}
        />

        <CardContent>
          <Box sx={{ mx: 'auto', maxWidth: 600 }}>
            <FormControl sx={{ p: 2, width: '480px' }} variant='outlined'>
              <TextField
                id='post'
                label='Share your thoughts'
                multiline
                rows={4}
                variant='outlined'
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </FormControl>
            <br />
            <Button size='small' sx={{ mx: 1 }} component='label'>
              <CameraAltIcon />
              <input
                hidden
                accept='image/*'
                onChange={(e) => setPhoto(e.target.files[0])}
                type='file'
              />
            </Button>
            <span>{photo ? photo.name : ''}</span>
            <br />
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
          </Box>
        </CardContent>
      </div>
      <CardActions
        sx={{ justifyContent: 'left', p: 2, backgroundColor: '#e0e0e0' }}
      >
        <Button variant='contained' onClick={addPost}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
};
export default NewPostForm;
