import PastGameCard from "./PastGameCard";

function PastGamesView({ decks }) {
  return (
    <div className="card-style w-full h-full gl-scrollbar">
      <h2 className="h2-text">Matches</h2>
      <PastGameCard deck={decks}/>
    </div>
  );
}

export default PastGamesView;
