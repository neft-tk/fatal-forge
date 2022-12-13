import PastGameCard from "./PastGameCard";

function PastGamesView({ decks }) {
  return (
    <div className="w-full h-full border-2 rounded-md text-main-text border-gray-300 bg-alt-bg">
      <h2 className="text-center text-lg m-4 font-bold">Matches</h2>
      <PastGameCard deck={decks}/>
    </div>
  );
}

export default PastGamesView;
