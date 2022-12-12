import DeckCard from './DeckCard';

function DeckView({ decks }) {

  return (
    <div className="w-full h-full border-4 rounded border-gray-300 bg-gradient-to-r from-main-orange via-yellow-300 to-main-orange text-main-bg font-bold p-4">
      <h2 className="text-center m-2">Forge your decks</h2>
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

export default DeckView;
