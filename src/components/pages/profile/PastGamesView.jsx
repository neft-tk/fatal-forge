import PastGameCard from "./PastGameCard";

function PastGamesView({ decks }) {
  return (
    <div className="w-full h-auto border-4 rounded border-gray-300 bg-gray-500">
      <h2 className="text-center m-2">Past Matches</h2>
      <PastGameCard deck={decks}/>
    </div>
  );
}

export default PastGamesView;
