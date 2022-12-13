import PastGameCard from "./PastGameCard";

function PastGamesView({ decks }) {
  return (
    <div className="w-full h-auto border-4 rounded border-gray-300 bg-gradient-to-r from-purple-800 via-yellow-300 to-blue-800">
      <h2 className="text-center text-lg m-4 text-main-bg font-bold">Past Matches</h2>
      <PastGameCard deck={decks}/>
    </div>
  );
}

export default PastGamesView;
