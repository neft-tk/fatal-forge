import { useState, useEffect } from 'react';
import API from '../../../utils/API';
import FriendCard from './FriendCard';
import UserCard from './UserCard';

function Friends({ userId, token }) {
  let user = {};
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const data = await API.getSingleUser(userId);
      user = {
        username: data.username,
        email: data.email,
        name: data.name,
        motto: data.motto,
        decks: data.Decks,
        friends: data.FavoriteUser,
        imagePath: data.imagePath,
      };
      setFriends(data.FavoriteUser);
    };

    async function fetchUsers() {
      const data = await API.getAllUsers();
      setUsers(data);
    };

    fetchUser();
    fetchUsers();
  }, []);

  const handleDeleteFriend = async (delObj) => {
    const { userId, friendId, token } = delObj
    const delMessage = await API.deleteFriend(userId, friendId, token)

    // Reset friends after del
    const data = await API.getSingleUser(userId);
    user = {
      username: data.username,
      email: data.email,
      name: data.name,
      motto: data.motto,
      decks: data.Decks,
      friends: data.FavoriteUser,
      imagePath: data.imagePath,
    };
    setFriends(data.FavoriteUser);
  };

  const handleAddFriend = async (addObj) => {
    const { userId, friendId, token } = addObj
    const addMessage = await API.addFriend(userId, friendId, token)

    // TODO: Only add users that are NOT friends.
    // Reset users after add
    const data = await API.getSingleUser(userId);
    user = {
      username: data.username,
      email: data.email,
      name: data.name,
      motto: data.motto,
      decks: data.Decks,
      friends: data.FavoriteUser,
      imagePath: data.imagePath,
    };
    setFriends(data.FavoriteUser);
  };

  return (
    <div className='flex flex-col lg:flex-row justify-evenly text-center h-screen'>
      <div className="text-main-text font-main-text-f gl-scrollbar w-full h-1/2 lg:h-full lg:overflow-auto lg:w-1/2">
        <h2 className="h2-text mt-12">Friends List</h2>
        {user ? (
          <div className="cards-container grid grid-cols-1">
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
      <div className="text-main-text font-main-text-f gl-scrollbar w-full h-1/2 lg:h-full lg:overflow-auto lg:w-1/2">
        <h2 className="h2-text mt-12">All Users</h2>
        {users ? (
          <div className="cards-container grid grid-cols-2 gap-2">
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