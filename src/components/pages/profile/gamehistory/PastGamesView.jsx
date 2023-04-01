import PastGameCard from "./PastGameCard";

// This component will display the past games played by the user
// TODO: Add functionality to this component.

function PastGamesView({ decks }) {
  return (
    <div className="card-background card-style w-full h-full">
      <h2 className="h2-text">Matches</h2>
      <PastGameCard deck={decks} />
    </div>
  );
}

export default PastGamesView;
