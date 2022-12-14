// in dev mode
import Static from './staticHelper';

const URL_PREFIX = Static.serverUrl;

const API = {
  // LOGIN/SIGNUP/TOKEN
  // @ api/users/login
  login: async (userObj) => {
    const res = await fetch(`${URL_PREFIX}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Res: ', res);
    if (res.status === 401) {
      console.log('DENIED LOGIN!');
      return await res.json({ msg: 'invalid login credentials' });
    }
    return await res.json();
  },

  // @ api/users
  signup: async (userObj) => {
    const res = await fetch(`${URL_PREFIX}/api/users/`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Res: ', res);
    if (res.status === 500) {
      console.log('ISSUE SIGNING UP!');
      return await res.json({ msg: 'invalid signup fields' });
    }
    return await res.json();
  },

  // @ api/users/readtoken
  getUserFromToken: async (token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/readtoken`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  },

  // GETs
  // @ api/cards
  getAllCards: async () => {
    const res = await fetch(`${URL_PREFIX}/api/cards/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  // @ api/cards/:cardId
  getSingleCard: async (cardId) => {
    const res = await fetch(`${URL_PREFIX}/api/cards/${cardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  // @ api/decks
  getAllDecks: async () => {
    const res = await fetch(`${URL_PREFIX}/api/decks/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  // @ api/decks/:deckId
  getSingleDeck: async (deckId) => {
    const res = await fetch(`${URL_PREFIX}/api/decks/${deckId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  // @ api/users
  getAllUsers: async () => {
    const res = await fetch(`${URL_PREFIX}/api/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  // @ api/users/:userId
  getSingleUser: async (userId) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  // TODO: FIX BUG FOR GETTING PROFILE IMAGE
  // @ api/images/:pathName
  getUserPicture: async (pathName) => {
    const res = await fetch(`${URL_PREFIX}/api/images/${pathName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    console.log('Res: ', res);
    console.log('Res URL: ', res.url);
    if (res.status === 404) {
      console.log('NO PROFILE PIC!');
      return res.json({ url: '' });
    }
    return res.json({ url: res.url});
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
  // getUserPicture: async () => {
  //   const res = await fetch(`${URL_PREFIX}/api/images/`);
  // },
  // getUserFriend: async (userId, friendId) => {
  //   const res = await fetch(`${URL_PREFIX}/api/users/${userId}/friends/${friendId}`);
  //   return await res.json();
  // },

  // POSTs
  createDeck: async (deckData) => {
    const res = await fetch(`${URL_PREFIX}/api/decks/`, {
      method: 'POST',
      body: JSON.stringify(deckData),
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return await res.json();
  },

  addFriend: async (userId, friendId, token) => {
    const res = await fetch(
      `${URL_PREFIX}/api/users/${userId}/friends/${friendId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          friendId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  },

  // PUTs
  editUser: async (token) => {},

  // DELETEs
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
    return await res.json();
  },

  // @ api/decks/:deckId
  deleteDeck: async (deckId, token) => {
    const res = await fetch(`${URL_PREFIX}/api/decks/${deckId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  },
};
export default API;
