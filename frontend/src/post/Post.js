import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Post = ({ userId, userName, post }) => {
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

        <Divider />
      </>
    </Card>
  );
};
export default Post;
