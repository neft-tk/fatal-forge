// Icons
import { FaUserPlus, FaUserAlt } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
// Utils
import Static from '../../../../utils/staticHelper';

// The UserCard component contains one user's info and buttons to add them as a friend, message them, or view their profile.
// Each user populated in the Friends component is passed down as a prop.

// Pass in the user object, the user's id, the token, and the handleAddFriend function.
function UserCard({ user, userId, token, handleAddFriend }) {
  // TODO: Message button does nothing.
  const handleMessage = () => {
    console.log('Message me!');
  };
  // TODO: Profile button does nothing.
  const handleProfile = () => {
    console.log('My profile!');
  };

  // When the add friend button is clicked, the handleAddFriend function is called.
  const handleAdd = (e) => {
    // The function is passed down from parent component.
    handleAddFriend({
      userId: userId,
      friendId: user.id,
      token: token,
    });
  };

  return (
    <div className="card-background card-style flex gap-4 justify-around">
      {/* Player Info */}
      <div className="card-flex center-all">
        {/* Player Picture */}
        <img
          className="w-20 h-20 rounded-3xl border-2 border-black"
          src={`${Static.serverUrl}/api/images/${user.imagePath}`}
          alt="User Profile Icon"
        />
        {/* Username and Motto */}
        <div className="flex flex-col justify-start">
          <h3 className="mt-2 text-xl font-alt-text-f">{user.username}</h3>
          <h4 className="mt-2 text-md">{user.motto}</h4>
        </div>
      </div>
      {/* Options */}
      <div className="card-flex justify-around">
        {/* View Profile */}
        <button className="user-button icon-button-style" onClick={handleProfile}>
          <FaUserAlt className='user-icon' />
        </button>
        {/* Message Player */}
        <button className="user-button icon-button-style" onClick={handleMessage}>
          <BsFillChatDotsFill className='user-icon' />
        </button>
        {/* Add Friend */}
        <button className="user-button icon-button-style" onClick={handleAdd}>
          <FaUserPlus className='user-icon' />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
