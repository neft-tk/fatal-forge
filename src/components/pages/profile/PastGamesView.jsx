import PastGameCard from "./PastGameCard";

function PastGamesView({ decks }) {
  return (
    <div className="card-background card-style w-full h-full">
      <h2 className="h2-text">Matches</h2>
      <PastGameCard deck={decks}/>
    </div>
  );
}

export default PastGamesView;
