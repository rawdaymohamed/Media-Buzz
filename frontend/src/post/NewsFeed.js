import Card from '@mui/material/Card';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
const NewsFeed = () => {
  return (
    <>
      <Card>
        <NewPostForm addPost={(f) => f} />
        <PostList removePost={(f) => f} posts={null} />
      </Card>
    </>
  );
};
export default NewsFeed;
