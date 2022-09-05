const getPostsByUser = async (id, jwt) => {
  try {
    const response = await fetch(`/api/users/${id}/posts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const createPost = async (userId, jwt, post) => {
  try {
    const response = await fetch(`/api/users/${userId}/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: post,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const getRecommendedPosts = async (userId, jwt) => {
  try {
    const result = await fetch(`/api/users/${userId}/recommended/posts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};

const addLike = async (postId, userId, jwt) => {
  try {
    const result = await fetch(`/api/posts/${postId}/users/${userId}/likes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
const removeLike = async (postId, userId, jwt) => {
  try {
    const result = await fetch(`/api/posts/${postId}/users/${userId}/likes`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};

const getNumLikes = async (postId) => {
  try {
    const result = await fetch(`/api/posts/${postId}/likes`);
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
const checkLiked = async (postId, userId) => {
  try {
    const result = await fetch(`/api/posts/${postId}/users/${userId}/liked`);
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
export default {
  getPostsByUser,
  createPost,
  getRecommendedPosts,
  addLike,
  removeLike,
  getNumLikes,
  checkLiked,
};
