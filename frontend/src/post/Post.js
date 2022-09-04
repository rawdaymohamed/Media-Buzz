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

const Post = ({ user, post }) => {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            src={user ? `/api/users/${user._id}/photo` : ''}
            alt={`${user.name} avatar`}
          />
        }
        title={`${user.name}`}
        subheader={`${post.created}`}
      />
      {post.photo && (
        <CardMedia
          component='img'
          height='194'
          image={`http://localhost:4000/api/users/${user._id}/posts/${post._id}/photo`}
          alt='post image'
        />
      )}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {post.text}
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  );
};
export default Post;
