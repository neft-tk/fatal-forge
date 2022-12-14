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
      <div className="flex m-2 p-2">
        <img
          className="w-28 h-28 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${user.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
        <div className="flex flex-col">
          <h3 className="mt-2 mx-4 text-xl font-alt-text-f">{user.username}</h3>
          <h4 className="mt-2 mx-4 text-md">{user.motto}</h4>
        </div>
      </div>

      <div className="flex justify-around">
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
