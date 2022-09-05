import {
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/auth-helper';
import apiPost from './api-post';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Post = ({ userId, userName, post }) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    apiPost.checkLiked(post._id, userId).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setLiked(data.liked);
      }
      apiPost.getNumLikes(post._id).then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else if (data) {
          setNumberOfLikes(data.numberOfLikes);
        }
      });
    });
  }, [liked]);
  const clickLikeBtn = () => {
    const jwt = isAuthenticated();
    if (liked) {
      apiPost.removeLike(post._id, userId, jwt).then((data) => {
        if (data && data.error) setError(data.error);
        else setLiked(false);
      });
    } else {
      apiPost.addLike(post._id, userId, jwt).then((data) => {
        if (data && data.error) setError(data.error);
        else setLiked(true);
      });
    }
  };
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
      <>
        <CardHeader
          avatar={
            <Avatar
              src={userId ? `/api/users/${userId}/photo` : ''}
              alt={`${userName} avatar`}
            />
          }
          component={RouterLink}
          to={`/users/${userId}/profile`}
          title={`${userName}`}
          sx={{ textDecoration: 'none', color: '#000' }}
          subheader={`${new Date(post.created).toDateString()}`}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {post.text}
          </Typography>
        </CardContent>
        {post.photo && (
          <CardMedia
            component='img'
            height='194'
            image={`http://localhost:4000/api/users/${userId}/posts/${post._id}/photo`}
            alt='post image'
          />
        )}
      </>
      <IconButton
        aria-label='like post'
        component='button'
        onClick={() => clickLikeBtn()}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <span>{numberOfLikes > 0 ? numberOfLikes : ''}</span>
    </Card>
  );
};
export default Post;
