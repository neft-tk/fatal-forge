import { useState, useEffect } from 'react';
import Static from '../../../../utils/staticHelper';
import API from '../../../../utils/API';

function DeckCard({ deck }) {
  let cardsArray = [];
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const data = await API.getSingleDeck(deck.id);
      const cardsData = data.Cards;
      for (let i = 0; i < 4; i++) {
        const card = cardsData[randomNumber()];
        cardsArray.push(card);
      }
      setCards(cardsArray);
    }

    fetchCards();
  }, []);

  const randomNumber = () => {
    const randomValue = Math.floor(Math.random() * 20);
    return randomValue;
  };


  return (
      <div className="flex flex-col center-all p-2 w-1/2">
        <img
          className="w-[80px] border-4 border-black rounded-3xl"
          src={`${Static.serverUrl}/api/images/${deck.imagePath}`}
          alt="Deck's Back of Card"
        />
        <h3 className="mt-4 font-alt-text-f">{deck.deckName}</h3>
      </div>
  );
}

export default DeckCard;
