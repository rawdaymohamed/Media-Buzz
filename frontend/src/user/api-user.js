const create = async (user) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (signal) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const read = async (id, jwt, signal) => {
  try {
    const response = await fetch(`/api/users/${id}/`, {
      method: 'GET',
      signal: signal,
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

const update = async (id, jwt, user) => {
  try {
    const response = await fetch(`/api/users/${id}/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      // body: JSON.stringify(user),
      body: user,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id, jwt) => {
  try {
    const response = await fetch(`/api/users/${id}/`, {
      method: 'DELETE',
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
export { list, create, read, update, remove };
