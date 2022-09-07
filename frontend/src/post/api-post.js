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
const getAllCommentsPost = async (userId, postId, jwt) => {
  try {
    const response = await fetch(
      `/api/users/${userId}/posts/${postId}/comments`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt.token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const createComment = async (userId, postId, jwt, comment) => {
  const response = await fetch(
    `/api/users/${userId}/posts/${postId}/comments`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: comment,
    }
  );
  return await response.json();
};

const getCommentById = async (userId, postId, commentId, jwt) => {
  const response = await fetch(
    `/api/users/${userId}/posts/${postId}/comments/${commentId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    }
  );
  return await response.json();
};
const updateCommentById = async (userId, postId, commentId, jwt, comment) => {
  const response = await fetch(
    `/api/users/${userId}/posts/${postId}/comments/${commentId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: comment,
    }
  );
  return await response.json();
};
const deleteCommentById = async (userId, postId, commentId, jwt) => {
  const response = await fetch(
    `/api/users/${userId}/posts/${postId}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    }
  );
  return await response.json();
};

export default {
  getPostsByUser,
  createPost,
  getRecommendedPosts,
  addLike,
  removeLike,
  getNumLikes,
  checkLiked,
  getAllCommentsPost,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
