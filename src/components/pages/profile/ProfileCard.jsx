import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import DeckView from './DeckView';
import StatsView from './StatsView';
import PastGamesView from './PastGamesView';
import Static from '../../../utils/staticHelper'

function ProfileCard({ user }) {
  return (
    <>
      <div className="flex m-4 p-6 items-center bg-alt-bg rounded justify-between">
        <div className="flex">
          <img
            className="w-40 h-40 rounded-full border-2 border-main-orange"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
          <div className="flex flex-col justify-center ml-12 mr-20">
            <h2 className="text-3xl mb-4">{user.username}</h2>
            <h3 className="text-sm mb-2">Aka: {user.name}</h3>
            <h3 className="text-sm">Motto: {user.motto}</h3>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="edit-icon m-4"
          >
            <FaUserEdit size="40" />
          </button>
          <button
            type="button"
            className="edit-icon m-4"
          >
            <MdDelete size="40" />
          </button>
        </div>
      </div>
      <div className="m-4 grid grid-cols-2 grid-rows-2 gap-6">
        <div className="flex flex-col col-span-1 row-span-1 gap-4">
          <DeckView decks={user.decks} />
          <StatsView />
        </div>
        <div className="col-span-1 row-span-2">
          <PastGamesView decks={user.decks}/>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
