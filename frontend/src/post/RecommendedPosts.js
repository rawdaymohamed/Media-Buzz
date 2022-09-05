import { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/auth-helper';
import Post from './Post';
import apiPost from './api-post';
const RecommendedPosts = () => {
  const [totalPosts, setTotalPosts] = useState([]);
  const [error, setError] = useState(null);
  const jwt = isAuthenticated();
  const userId = jwt.user._id;
  useEffect(() => {
    apiPost.getRecommendedPosts(userId, jwt).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setTotalPosts(data);
      }
    });
  }, [userId, jwt]);

  return (
    <>
      {totalPosts &&
        totalPosts.map(({ posts, user }, i) => (
          <div key={i}>
            {posts.map((post) => (
              <Post
                key={post._id}
                userId={user._id}
                userName={user.name}
                post={post}
              />
            ))}
          </div>
        ))}
    </>
  );
};

export default RecommendedPosts;
