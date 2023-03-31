import { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import API from '../../../utils/API';

// The Profile components 

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
    });
  };

  const handleDeleteUser = async (delObj) => {
    const { userId, token } = delObj;
    const delMessage = await API.deleteUser(userId, token);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // If user is found, render the ProfileCard component, otherwise render a message to log in
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
        // TODO: This message should be bigger and centered at least.
      ) : (
        'Please Log In'
      )}
    </div>
  );
}

export default Profile;