import { FaUserPlus, FaUserAlt } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import Static from '../../../utils/staticHelper';

function UserCard({ user, userId, token, handleAddFriend }) {
  const handleMessage = () => {
    console.log('Message me!');
  };

  const handleProfile = () => {
    console.log('My profile!');
  };

  const handleAdd = (e) => {
    handleAddFriend({
      userId: userId,
      friendId: user.id,
      token: token,
    });
  };

  return (
    <div className="card-style">
      <div className="flex flex-col m-4 p-2">
        <img
          className="w-28 h-28 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${user.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
        <h3 className="mt-2 ml-4 text-xl">{user.username}</h3>
        <h4 className="mt-2 ml-6 text-md">{user.motto}</h4>
      </div>

      <div className="text-center">
        <h4>Game Stats:</h4>
      </div>
      <div className="flex flex-col">
        <button className="navbar-icon" onClick={handleProfile}>
          <FaUserAlt size="28" />
        </button>
        <button className="navbar-icon" onClick={handleMessage}>
          <BsFillChatDotsFill size="28" />
        </button>
        <button className="navbar-icon" onClick={handleAdd}>
          <FaUserPlus size="28" />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
