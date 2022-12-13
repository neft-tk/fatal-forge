import { useState, useEffect } from 'react';
import API from '../../../utils/API';
import ProfileCard from './ProfileCard';

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
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
        motto: data.motto,
        decks: data.Decks,
        friends: data.FavoriteUser,
        imagePath: data.imagePath,
        decks: data.Decks,
        friends: data.FriendsUser,
      });
    }

    fetchUser();
  }, [])

  return (
    <div className="m-6 text-main-text font-main-text-f">
      {user ? <ProfileCard user={user} /> : ''}
    </div>
  );
}

export default Profile;
