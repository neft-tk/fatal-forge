import DeckCard from './DeckCard';

function DeckView({ decks }) {

  return (
    <div className="w-full h-full border-2 rounded-md border-gray-300 bg-alt-bg text-main-text font-bold p-4">
      <h2 className="text-center text-2xl font-display-text-f">Decks</h2>
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

export default DeckView;
