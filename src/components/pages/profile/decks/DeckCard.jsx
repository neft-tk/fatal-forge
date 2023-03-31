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
    // Overall Card
    <div className="flex flex-wrap justify-evenly items-center rounded h-full">
      {/* Deck + Deck Name */}
      {/* TODO: Make each deck a link to deckbuilder with that deck */}
      <div className="flex flex-col center-all p-2">
        <img
          className="h-1/3 border-4 border-black rounded-3xl"
          src={`${Static.serverUrl}/api/images/${deck.imagePath}`}
          alt="Deck's Back of Card"
        />
        <h3 className="mt-4 font-alt-text-f">{deck.deckName}</h3>
      </div>
    </div>
  );
}

export default DeckCard;
