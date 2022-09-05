import { Typography, Paper, Grid } from '@mui/material';
import NewPostForm from './NewPostForm';
import RecommendedPosts from './RecommendedPosts';
import FindPeople from '../user/FindPeople';
const NewsFeed = ({ user }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <Paper elevation={2} sx={{ maxWidth: 600, mx: 'auto', p: 2, mb: 2 }}>
          <Typography variant='h6'>NewsFeed</Typography>
          <div>{user && <NewPostForm user={user} />}</div>
          <RecommendedPosts />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <FindPeople id={user._id} />
      </Grid>
    </Grid>
  );
};
export default NewsFeed;
