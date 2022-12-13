import Static from '../../../utils/staticHelper'

function FriendCard({ friendId, userId, friend, token, handleDeleteFriend }) {

  const handleDelete = (e) => {
    handleDeleteFriend({
      userId: userId,
      friendId: friendId,
      token: token
    });
  };

  return (
    <div className='flex'>
      <div className="flex flex-col text-center m-4 p-4 justify-center items-center">
        <img 
          className="w-32 h-32"
          src={`${Static.serverUrl}/api/images/${friend.imagePath}`}
          alt="Deck's Back of Card"
        ></img>
        <p className="ml-4">{friend.username}</p>
      </div>
      <button className="edit-icon" onClick={handleDelete}>Delete Friend</button>
    </div>
  );
}

export default FriendCard;