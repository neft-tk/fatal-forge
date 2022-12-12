function DeckCard({ deck }) {
  return (
    <div className="flex m-4 p-4 justify-center items-center">
      <img
        src={`http://localhost:3001/api/images/${deck.imagePath}`}
        alt="Deck's Back of Card"
      ></img>
      <p className="ml-4">{deck.deckName}</p>
    </div>
  );
}

export default DeckCard;
