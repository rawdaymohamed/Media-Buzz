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

export default { getPostsByUser };
