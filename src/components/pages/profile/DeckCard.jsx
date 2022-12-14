import { useState, useEffect } from 'react';
import Static from '../../../utils/staticHelper';
import API from '../../../utils/API';

function DeckCard({ deck }) {
  let cardsArray = [];
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      // console.log('Here');
      // console.log(deck);
      const data = await API.getSingleDeck(deck.id);
      // console.log(data);
      // console.log(data.Cards);
      const cardsData = data.Cards;
      for (let i = 0; i < 4; i++) {
        const card = cardsData[randomNumber()];
        // console.log('Random Card:');
        // console.log(card);
        // console.log(card.cardName);
        // console.log(card.imagePath);
        cardsArray.push(card);
        // setCards((prevCards) => [...prevCards, card]);
      }
      setCards(cardsArray);
      // console.log('Card Array: ', cardsArray);
      // console.log('Card State: ', cards);
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
      <div className="flex flex-col justify-center items-center p-2">
        <img
          className="h-1/3 border-4 border-black rounded-3xl"
          src={`${Static.serverUrl}/api/images/${deck.imagePath}`}
          alt="Deck's Back of Card"
        />
        <h3 className="mt-4">{deck.deckName}</h3>
      </div>
      {/* Sample */}
      {/* <div className="ml-4 flex flex-col justify-center items-center">
        <h3>Includes:</h3>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col col-span-1 row-span-1 text-center justify-center items-center">
              <h4 className='text-sm'>{card.cardName}</h4>
              <img
                className="w-16 h-16 border-2 border-black rounded-lg"
                src={`${Static.serverUrl}/api/images/${card.imagePath}`}
                alt="Deck's Sprite"
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default DeckCard;
