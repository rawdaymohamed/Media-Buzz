import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const Comment = ({ comment, userId, userName }) => {
  return (
    <>
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
            subheader={`${new Date(comment.created).toDateString()}`}
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              {comment.text}
            </Typography>
          </CardContent>
        </>
      </Card>
    </>
  );
};
export default Comment;
