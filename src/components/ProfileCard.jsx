import { FaEdit } from 'react-icons/fa';
import DeckView from './DeckView';
import StatsView from './StatsView';
import PastGamesView from './PastGamesView';
import Static from '../utils/staticHelper'

function ProfileCard({ user }) {
  return (
    <div>
      <div className="flex m-4 p-4 items-center bg-alt-bg justify-around rounded">
        <div className="flex">
          <img
            className="rounded"
            src={`${Static.serverUrl}/api/images/${user.imagePath}`}
            alt="Profile Picture"
          />
          <div className="flex flex-col justify-center ml-8 mr-20">
            <h2 className="text-2xl">{user.username}</h2>
            <h3 className="text-md">Aka: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Motto: {user.motto}</h3>
          </div>
        </div>
        <button
          type="button"
          className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm pl-8 w-24 h-24 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <FaEdit size="40" />
        </button>
      </div>
      <div className="m-4 grid grid-cols-2 grid-rows-2 gap-6">
        <div className="flex flex-col col-span-1 row-span-1 gap-4">
          <DeckView decks={user.decks} />
          <StatsView />
        </div>
        <div className="col-span-1 row-span-2">
          <PastGamesView />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
