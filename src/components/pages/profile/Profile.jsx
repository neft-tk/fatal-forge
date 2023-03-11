import { useState, useEffect } from 'react';
import API from '../../../utils/API';
import ProfileCard from './ProfileCard';

function Profile({ userId, token, setIsLoggedIn }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await API.getSingleUser(userId);
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
    const { username, email, name, motto, userId, token } = editObj;
    const editMessage = await API.editUser({
      username,
      email,
      name,
      motto,
      userId,
      token
    });
    const data = await API.getSingleUser(userId);
    setUser({
      username: data.username,
      email: data.email,
      name: data.name,
      motto: data.motto,
      decks: data.Decks,
      friends: data.FavoriteUser,
      imagePath: data.imagePath,
      decks: data.Decks,
      friends: data.FavoriteUser,
    });
  };

  const handleDeleteUser = async (delObj) => {
    const { userId, token } = delObj;
    const delMessage = await API.deleteUser(userId, token);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col justify-evenly h-auto">
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