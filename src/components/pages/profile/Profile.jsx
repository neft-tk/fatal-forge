import { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import API from '../../../utils/API';

// The Profile components 

function Profile({ userId, token, setIsLoggedIn }) {
  // User data
  const [user, setUser] = useState(null);

  // On page load fetch the current user's data
  useEffect(() => {
    refreshUserData();
  }, []);

  // Hits the server to get the current user's data
  const refreshUserData = async () => {
    const data = await API.getSingleUser(userId);
    setUser(data);
  }

  // Handles the edit user form submission
  const handleEditUser = async (editObj) => {
    // Call the editUser API function, pass in the editted user properties.
    const editMessage = await API.editUser(editObj);
    // Hit the server to refresh with the new user data
    refreshUserData();
  };

  // Delete the current user from the database, logging them out.
  const handleDeleteUser = async (delObj) => {
    const { userId, token } = delObj;
    // Delete the user
    const delMessage = await API.deleteUser(userId, token);
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Log the user out
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
        // TODO: This message should be bigger and centered at least, return an actual element.
      ) : (
        'Please Log In'
      )}
    </div>
  );
}

export default Profile;