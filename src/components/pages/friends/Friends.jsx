import { useState, useEffect } from 'react';
import API from '../../../utils/API';
import FriendCard from './FriendCard';

function Friends({ userId, token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await API.getUser(userId);
      console.log(data);
      console.log(data.username);
      console.log(data.FavoriteUser);
      const friends = data.FavoriteUser;
      for (let i = 0; i < friends.length; i++) {
        const friend = friends[i];
        console.log(friend);
        console.log(friend.username);
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
        friends: data.FavoriteUser,
      });
    }

    fetchUser();
  }, []);

  const handleDeleteFriend = async (delObj) => {
    const { userId, friendId, token } = delObj
    console.log('Delete this friend.');
    console.log('User ID: ', userId);
    console.log('Friend ID: ', friendId);
    console.log('Token: ', token);
    const delMessage = await API.deleteFriend(userId, friendId, token)
    console.log(delMessage);
    // TODO: Reset friends after del
    // API.getUsersFriends().then(data => {
    //   setFriends
    // })
  };

  return (
    <div className="m-6 text-main-text font-main-text-f">
      <h2>Friends...</h2>
      {user ? (
        <div className="w-full h-full border-4 rounded border-gray-300 bg-gradient-to-r from-main-orange via-yellow-300 to-main-orange text-main-bg font-bold p-4">
          <h2 className="text-center m-2">Your Friends</h2>
          {user.friends.map((friend) => (
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
  );
};

export default Friends;