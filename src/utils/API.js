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
  getCards: async (cardData) => {
    const res = await fetch(`${URL_PREFIX}/api/cards/`, {
      method: 'GET',
      body: JSON.stringify(cardData),
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },
  createDeck: async (deckData) => {
    const res = await fetch(`${URL_PREFIX}/api/decks/`, {
      method: 'POST',
      body: JSON.stringify(deckData),
      headers: {
        'Content-Type': 'Application/json',
      },
    })
    return await res.json();
  },
  // getCardBackSprite: async (cardback) => {
  //   const res = await fetch(`${URL_PREFIX}/api/images/`, {
  //     method: 'GET',
  //     body: JSON.stringify(cardback),
  //     headers: {
  //       'Content-Type': 'Application/json',
  //     },
  //   })
  //   return await res.json();
  // },
  getUser: async (userId) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}`);
    return await res.json();
  },
  getAllUsers: async () => {
    const res = await fetch(`${URL_PREFIX}/api/users/`);
    return await res.json();
  },
  // getUserPicture: async () => {
  //   const res = await fetch(`${URL_PREFIX}/api/images/`);
  // },
  // getUserFriend: async (userId, friendId) => {
  //   const res = await fetch(`${URL_PREFIX}/api/users/${userId}/friends/${friendId}`);
  //   return await res.json();
  // },
  getUserFromToken: async (token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/readtoken`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await res.json();
  },
  getDeckCards: async (deckId) => {
    const res = await fetch(`${URL_PREFIX}/api/decks/${deckId}`);
    return await res.json();
  },

  // POSTs
  addFriend: async (userId, friendId, token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}/friends/${friendId}`, {
      method: 'POST',
      body:JSON.stringify({
        userId,
        friendId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return await res.json();
  },

  // PUTs
  editUser: async (token) => {

  },

  // DELETEs
  // @ api/users/:userId
  deleteUser: async (userId, token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  },
};
export default API;
