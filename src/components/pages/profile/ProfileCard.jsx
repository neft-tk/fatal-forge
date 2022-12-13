import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import DeckView from './DeckView';
import StatsView from './StatsView';
import PastGamesView from './PastGamesView';
import Static from '../../../utils/staticHelper'

function ProfileCard({ user, userId, token, handleEditUser, handleDeleteUser }) {

  const handleEdit = (e) => {
    console.log("Edit clicked.");
    console.log("Will edit following user: ", user);
    console.log("With the following ID: ", userId);
    handleEditUser({
      userObj: {

      },
      userId: userId,
      token: token
    });
  };

  const handleDelete = (e) => {
    // console.log("Delete clicked.");
    // console.log("Will delete following user: ", user);
    // console.log("With the following ID: ", userId);
    handleDeleteUser({
      userId: userId,
      token: token
    });
  };

  return (
    <>
      {/* Profile Card, Name + Pic + Motto + Options */}
      <div className="flex justify-evenly w-full h-1/3">
        {/* Pic + Name */}
        <div className="flex justify-evenly w-1/3">
          <div className="flex flex-col justify-evenly ">
            <h2 className="text-4xl">{user.name}</h2>
            <h3 className="text-sm mb-2 text-center">username: <span className='italic font-semibold tracking-wide'>{user.username}</span></h3>
          </div>
          <img
            className="w-40 h-40 rounded-full border-2 border-main-orange my-auto mx-0"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
        </div>
        {/* Motto */}
        <div className=' w-1/3 flex flex-col justify-evenly items-center'>
          <h1 className='text-center'>Motto:</h1>
          <h3 className="text-sm text-center">{user.motto}</h3>
        </div>
        {/* Profile Settings */}
        <div className='flex justify-evenly w-1/3 my-auto'>
          <button
            type="button"
            className="profile-icon m-4"
            onClick={handleEdit}
          >
            <FaUserEdit size="48" />
          </button>
          <button
            type="button"
            className="profile-icon m-4"
            onClick={handleDelete}
          >
            <MdDelete size="48" className='' />
          </button>
        </div>
      </div>
      {/* Decks, Matches, Stats */}
      <div className="flex justify-evenly items-center h-2/3">
        {/* Decks */}
        <div className="w-1/4 h-4/5">
          <DeckView decks={user.decks} />
        </div>
        {/* Stats */}
        <div className="w-1/4 h-4/5">
          <StatsView />
        </div>
        {/* Matches */}
        <div className="w-1/4 h-4/5">
          <PastGamesView decks={user.decks} />
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
