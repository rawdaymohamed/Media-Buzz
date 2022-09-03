import React, { useState, useEffect } from 'react';
import Post from './Post';
import { isAuthenticated } from '../auth/auth-helper';
import apiPost from './api-post';
const PostList = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState({});
  const jwt = isAuthenticated();

  useEffect(() => {
    apiPost.getPostsByUser(user._id, jwt).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) setPosts(data);
    });
  }, [user, jwt]);
  return (
    <>
      {posts &&
        posts.map((post) => <Post key={post._id} user={user} post={post} />)}
    </>
  );
};
export default PostList;
