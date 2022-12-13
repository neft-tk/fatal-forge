import DeckCard from './DeckCard';

function DeckView({ decks }) {

  return (
    <div className="w-full h-full border-4 rounded border-gray-300 bg-gradient-to-r from-blue-800 via-yellow-300 to-purple-800 text-main-bg font-bold p-4">
      <h2 className="text-center text-lg">Your Decks</h2>
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

export default DeckView;
