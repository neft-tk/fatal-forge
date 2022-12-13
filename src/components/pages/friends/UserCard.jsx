import { FaUserPlus } from 'react-icons/fa';
import Static from '../../../utils/staticHelper'

function UserCard({ user, userId, token, handleAddFriend }) {

  const handleAdd = (e) => {
    console.log("Add this guy as my friend.")
    handleAddFriend({
      userId: userId,
      friendId: user.id,
      token: token
    });
  };

  return (
    <div className='flex'>
      <div className="flex flex-col text-center m-4 p-4 justify-center items-center">
        <img 
          className="w-32 h-32"
          src={`${Static.serverUrl}/api/images/${user.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
        <p className="ml-4">{user.username}</p>
      </div>
      <button className="profile-icon" onClick={handleAdd}><FaUserPlus size="40" /></button>
    </div>
  );
}

export default UserCard;