import { useState, useEffect } from 'react';
import { FaUserTimes, FaUserAlt } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import API from '../../../utils/API';
import Static from '../../../utils/staticHelper';

function FriendCard({ friendId, userId, friend, token, handleDeleteFriend }) {
  const [friendDeckData, setFriendDeckData] = useState({});

  useEffect(() => {
    async function fetchFriend() {
      const data = await API.getSingleUser(friendId);
      const deckName = data.Decks[0].deckName;
      const deckPath = data.Decks[0].imagePath;
      setFriendDeckData({
        deckName,
        deckPath
      });
    };

    fetchFriend();
  }, []);

  // TODO: Add functionality
  const handleMessage = () => {
    console.log('Message me!');
  };

  // TODO: Add functionality
  const handleProfile = () => {
    console.log('My profile!');
  };

  const handleDelete = () => {
    handleDeleteFriend({
      userId: userId,
      friendId: friendId,
      token: token,
    });
  };

  return (
    <div className="card-background card-style justify-between flex mx-8">
      {/* Player Info */}
      <div className="card-flex center-all m-2 p-2">
        <img
          className="w-28 h-28 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${friend.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
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

      {/* Buttons Group */}
      <div className="card-flex justify-around">
        <button className="navbar-icon" onClick={handleProfile}>
          <FaUserAlt size="28" />
        </button>
        <button className="navbar-icon" onClick={handleMessage}>
          <BsFillChatDotsFill size="28" />
        </button>
        <button className="navbar-icon" onClick={handleDelete}>
          <FaUserTimes size="28" />
        </button>
      </div>
    </div>
  );
}

export default FriendCard;
