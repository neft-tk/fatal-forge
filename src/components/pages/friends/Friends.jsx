import { useState, useEffect } from 'react';
// Sub-components
import FriendCard from './subviews/FriendCard';
import UserCard from './subviews/UserCard';
// Utils
import API from '../../../utils/API';

// The friends component allows players to see all of their friends and add new friends.

// TODO: Add personal chat, currently a dummy button.
// TODO: Add ability to see friends profile, currently a dummy button.

// Recieves userId and token from the parent component.
function Friends({ userId, token }) {
  // User object, updated on page load.
  const [user, setUser] = useState({});
  // User's friends, updated on page load.
  const [friends, setFriends] = useState([]);
  // All users, updated on page load.
  const [users, setUsers] = useState([]);

  // Once on load, get all users and the user's info.
  useEffect(() => {
    // Get all users
    async function fetchUsers() {
      const data = await API.getAllUsers();
      // Reflect in state.
      setUsers(data);
    };
    // Get the user's info and friends.
    refreshUserInfo();
    fetchUsers();
  }, []);

  // Refreshes the user's info in state, used when something changes.
  const refreshUserInfo = async () => {
    const data = await API.getSingleUser(userId);
    setUser(data);
    setFriends(data.FavoriteUser);
  }

  // Deletes a friend from the user's friend list.
  const handleDeleteFriend = async (delObj) => {
    // Pass in the users id, the friend's id, and the token.
    const { userId, friendId, token } = delObj
    const delMessage = await API.deleteFriend(userId, friendId, token)
    // Update state.
    refreshUserInfo();
  };

  // Adds a friend to the user's friend list.
  const handleAddFriend = async (addObj) => {
        // Pass in the users id, the friend's id, and the token.
    const { userId, friendId, token } = addObj
    const addMessage = await API.addFriend(userId, friendId, token)
    // Update state.
    refreshUserInfo();
  };

  return (
    <div className='flex flex-col lg:flex-row justify-evenly text-center h-screen'>
      {/* Friends List */}
      <div className="text-main-text font-main-text-f gl-scrollbar w-full h-1/2 lg:h-full lg:overflow-auto lg:w-1/2">
        <h2 className="h2-text mt-12">Friends List</h2>
        {user ? (
          <div className="cards-container grid grid-cols-1">
            {/* For each friend of the user, map a card component into this div. */}
            {friends.map((friend, index) => (
              <FriendCard
                key={index}
                friendId={friend.id}
                userId={userId}
                friend={friend}
                token={token}
                handleDeleteFriend={handleDeleteFriend}
              />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      {/* All Users */}
      <div className="text-main-text font-main-text-f gl-scrollbar w-full h-1/2 lg:h-full lg:overflow-auto lg:w-1/2">
        <h2 className="h2-text mt-12">All Users</h2>
        {users ? (
          <div className="cards-container grid grid-cols-2 gap-2">
            {/* For each user found, map a card component into this div. */}
            {users.filter((user) => user.id !== userId).map((user, index) => (
              <UserCard
                key={index}
                user={user}
                userId={userId}
                token={token}
                handleAddFriend={handleAddFriend}
              />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Friends;