import DeckCard from './DeckCard';

function DeckView({ decks }) {

  return (
    <div className="card-background card-style w-full h-full">
      <h2 className="h2-text">Decks</h2>
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

export default DeckView;
