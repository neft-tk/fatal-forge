import { useState, useEffect } from 'react';
import API from '../../../utils/API';
import ProfileCard from './ProfileCard';

function Profile({ userId, token, setIsLoggedIn }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await API.getSingleUser(userId);
      // console.log(data);
      // console.log(data.username);
      // console.log(data.Decks);
      // const decks = data.Decks;
      // for (let i = 0; i < decks.length; i++) {
      //   const deck = decks[i];
      //   console.log(deck);
      //   console.log(deck.deckName);
      // }
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
  }, []);

  const handleEditUser = async (editObj) => {
    const { userId, token } = editObj;
    // console.log('Editing...');
    // console.log('Edit this user.');
    // console.log('User ID: ', userId);
    // console.log('Token: ', token);
    // const editMessage = await API.editUser(userId, token)
    // console.log(editMessage);
  };

  const handleDeleteUser = async (delObj) => {
    const { userId, token } = delObj;
    // console.log('Deleting...');
    // console.log('Delete this user.');
    // console.log('User ID: ', userId);
    // console.log('Token: ', token);
    const delMessage = await API.deleteUser(userId, token);
    console.log(delMessage);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col justify-evenly shrink">
      {user ? (
        <ProfileCard
          user={user}
          userId={userId}
          token={token}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
        />
      ) : (
        'Please Log In'
      )}
    </div>
  );
}

export default Profile;
