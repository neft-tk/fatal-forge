// in dev mode
import Static from './staticHelper';

const URL_PREFIX = Static.serverUrl;

const API = {
  // LOGIN/SIGNUP
  login: async (userObj) => {
    const res = await fetch(`${URL_PREFIX}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },
  signup: async (userObj) => {
    const res = await fetch(`${URL_PREFIX}/api/users/`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  },

  // GETS
  getUser: async (userId) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}`);
    return await res.json();
  },
  getUserPicture: async () => {
    const res = await fetch(`${URL_PREFIX}/api/images/`);
  },
  getUserFriends: async (userId, friendId) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}/friends/${friendId}`);
    return await res.json();
  },
  getUserFromToken: async (token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/readtoken`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  },

  // DELETES
  // @ api/users/:userId
  deleteUser: async (userId, token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  },

  // @ api/users/:userId/friends/:friendId
  deleteFriend: async (userId, friendId, token) => {
    const res = await fetch(
      `${URL_PREFIX}/api/users/${userId}/friends/${friendId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res;
  },
};
export default API;
