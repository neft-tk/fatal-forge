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
    <div className="card-background card-style flex gap-4 justify-around">
      <div className="card-flex center-all">
        <img
          className="w-20 h-20 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${user.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
        <div className="flex flex-col justify-start">
          <h3 className="mt-2 text-xl font-alt-text-f">{user.username}</h3>
          <h4 className="mt-2 text-md">{user.motto}</h4>
        </div>
      </div>

      <div className="card-flex justify-around">
        <button className="user-button icon-button-style" onClick={handleProfile}>
          <FaUserAlt className='user-icon' />
        </button>
        <button className="user-button icon-button-style" onClick={handleMessage}>
          <BsFillChatDotsFill className='user-icon' />
        </button>
        <button className="user-button icon-button-style" onClick={handleAdd}>
          <FaUserPlus className='user-icon' />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
