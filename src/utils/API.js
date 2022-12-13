// in dev mode
import Static from './staticHelper'

const URL_PREFIX = Static.serverUrl;

const API = {
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
  getUser: async (userId) => {
    const res = await fetch(`${URL_PREFIX}/api/users/${userId}`);
    return await res.json();
  },
  getUserPicture: async () => {
    const res = await fetch(`${URL_PREFIX}/api/images/`)
  },
  // getUserFriends: async () => {

  // },
  getUserFromToken: async (token) => {
    const res = await fetch(`${URL_PREFIX}/api/users/readtoken`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  },
};
export default API;
