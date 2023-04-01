import DeckCard from './DeckCard';

// The DeckView function holds all decks on a given profile.

export default function DeckView({ decks }) {

  return (
    <div className="card-background card-style w-full h-full">
      <h2 className="h2-text">Decks</h2>
      {/* Populate with as many decks as the user has. */}
      <div className='flex flex-wrap'>
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};