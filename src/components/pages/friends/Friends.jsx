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
      // console.log(data);
      // console.log(data.username);
      // console.log(data.FavoriteUser);
      // console.log(friends);
      // const friendsData = data.FavoriteUser;
      // for (let i = 0; i < friendsData.length; i++) {
      //   const friend = friendsData[i];
      //   console.log(friend);
      //   console.log(friend.username);
      // }
      user = {
        username: data.username,
        email: data.email,
        name: data.name,
        motto: data.motto,
        decks: data.Decks,
        friends: data.FavoriteUser,
        imagePath: data.imagePath,
        decks: data.Decks,
        friends: data.FavoriteUser,
      };
      setFriends(data.FavoriteUser);
    };

    async function fetchUsers() {
      const data = await API.getAllUsers();
      console.log(data);
      // console.log(data.username);
      // console.log(data.FavoriteUser);
      // console.log(friends);
      // const friendsData = data.FavoriteUser;
      // for (let i = 0; i < friendsData.length; i++) {
      //   const friend = friendsData[i];
      //   console.log(friend);
      //   console.log(friend.username);
      // }
      setUsers(data);
    };

    fetchUser();
    fetchUsers();
  }, []);

  const handleDeleteFriend = async (delObj) => {
    const { userId, friendId, token } = delObj
    // console.log('Delete this friend.');
    // console.log('User ID: ', userId);
    // console.log('Friend ID: ', friendId);
    // console.log('Token: ', token);
    const delMessage = await API.deleteFriend(userId, friendId, token)
    console.log(delMessage);

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
      decks: data.Decks,
      friends: data.FavoriteUser,
    };
    setFriends(data.FavoriteUser);
  };

  const handleAddFriend = async (addObj) => {
    const { userId, friendId, token } = addObj
    console.log('Add this friend.');
    console.log('User ID: ', userId);
    console.log('Friend ID: ', friendId);
    console.log('Token: ', token);
    const addMessage = await API.addFriend(userId, friendId, token)
    console.log(addMessage);

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
      decks: data.Decks,
      friends: data.FavoriteUser,
    };
    setFriends(data.FavoriteUser);
  };

  return (
    <>
      <div className="m-6 py-10 px-20 text-main-text font-main-text-f">
        <h2 className="m-4 text-2xl">Friends List</h2>
        {user ? (
          <div className="cards-container grid grid-cols-1 lg:grid-cols-2">
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
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
      <div className="m-6 px-20 text-main-text font-main-text-f">
        <h2 className="m-4 text-2xl">Other Users</h2>
        {users ? (
          <div className="cards-container grid grid-cols-1 lg:grid-cols-2">
            {users.filter((user) => user.id !== userId).map((user) => (
              <UserCard
                key={users.id}
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
    </>
  );
};

export default Friends;