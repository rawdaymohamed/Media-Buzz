import Card from '@mui/material/Card';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
const NewsFeed = ({ user }) => {
  return (
    <>
      <Card>
        {user && <NewPostForm user={user} />}
        {/* <PostList user={user} removePost={(f) => f} /> */}
      </Card>
    </>
  );
};
export default NewsFeed;
