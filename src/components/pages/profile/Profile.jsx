import { useState } from 'react';
import API from '../../../utils/API';
import ProfileCard from '../../ProfileCard';

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  async function displayUser() {
    const data = await API.getUser(userId);
    console.log(data);
    console.log(data.username);
    console.log(data.Decks);
    const decks = data.Decks;
    for (let i = 0; i < decks.length; i++) {
      const deck = decks[i];
      console.log(deck);
      console.log(deck.deckName);
    }
    setUser({
      username: data.username,
      email: data.email,
      name: data.name,
      biography: data.biography,
      decks: data.Decks,
      friends: data.FavoriteUser,
      imagePath: data.imagePath,
      decks: data.Decks,
      friends: data.FriendsUser,
    });
    console.log('Here');
    console.log(user);
  }

  return (
    <div className="m-6 text-main-text font-main-text-f">
      <h1 className="text-alt-text font-display-text-f text-2xl">Profile</h1>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-24 h-24 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={displayUser}
      >
        Click here to test API Endpoint
      </button>

      {user ? <ProfileCard user={user} /> : ''}
    </div>
  );
}

export default Profile;
