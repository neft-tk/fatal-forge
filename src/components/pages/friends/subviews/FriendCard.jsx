import { useState, useEffect } from 'react';
// React Icons
import { FaUserTimes, FaUserAlt } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
// Helpers
import API from '../../../../utils/API';
import Static from '../../../../utils/staticHelper';

// The Friend component contains one friend's info and buttons to message them, view their profile, or remove them as a friend.

// Pass in the friend object, the friend's id, the token, and the handleDeleteFriend function.
function FriendCard({userId, friend, token, handleDeleteFriend }) {
  // Stores the friend's favorite deck
  const [friendDeckData, setFriendDeckData] = useState({});

  // On page load, fetch the friend's "favorite" deck.
  useEffect(() => {
    async function fetchFriend() {
      // Hit the API to get the friend's data.
      const data = await API.getSingleUser(friend.id);
      // TODO: Not actually their favorite deck, just their first.
      const deckName = data.Decks[0].deckName;
      const deckPath = data.Decks[0].imagePath;
      // Reflect in state.
      setFriendDeckData({
        deckName,
        deckPath
      });
    };

    fetchFriend();
  }, []);

  // TODO: Message button does nothing.
  const handleMessage = () => {
    console.log('Message me!');
  };

  // TODO: Profile button does nothing.
  const handleProfile = () => {
    console.log('My profile!');
  };

  // Delete friend button calls the handleDeleteFriend function.
  const handleDelete = () => {
    // Function passed down from parent component.
    handleDeleteFriend({
      userId: userId,
      friendId: friend.id,
      token: token,
    });
  };

  return (
    <div className="card-background card-style justify-between flex mx-8">
      {/* Player Info */}
      <div className="card-flex center-all m-2 p-2">
        {/* Profile Picture */}
        <img
          className="w-28 h-28 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${friend.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
        {/* Username and Motto */}
        <h3 className="mt-2 text-xl font-alt-text-f">{friend.username}</h3>
        <h4 className="mt-2 text-md">{friend.motto}</h4>
      </div>
      {/* Favoite Deck */}
      <div className="card-flex center-all mx-4">
        <h3 className="h3-text mb-4">Favorite Deck:</h3>
        <img
          className="max-w-36 max-h-36 lg:w-20 lg:h-20 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${friendDeckData.deckPath}`}
          alt="Deck's Back of Card"
        ></img>
        <h4 className="mt-4 text-md">{friendDeckData.deckName}</h4>
      </div>
      {/* Options */}
      <div className="card-flex justify-around">
        {/* View Profile */}
        <button className="navbar-icon" onClick={handleProfile}>
          <FaUserAlt size="28" />
        </button>
        {/* Message */}
        <button className="navbar-icon" onClick={handleMessage}>
          <BsFillChatDotsFill size="28" />
        </button>
        {/* Remove Friend */}
        <button className="navbar-icon" onClick={handleDelete}>
          <FaUserTimes size="28" />
        </button>
      </div>
    </div>
  );
}

export default FriendCard;
