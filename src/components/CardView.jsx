import React, { useState } from "react";
// import Deckbuilder, { addCard } from "./pages/deckbuilder/Deckbuilder";

function CardView({ cardData, setDeckData, deckData}) {


  const addCard = (e) => {
    e.preventDefault();
    const newCardName = e.target.innerHTML.split(",");
    const newCard = {
      name: newCardName[0],
      id: newCardName[1],
    };
    console.log(newCard);
    if(deckData.filter((card) => 
      newCard.id == card.id
    ).length === 1) {
      alert('Cannot have more than one card with the same unique id.')
      return
    }

    const newDeck = [...deckData];
    newDeck.push(newCard);
    setDeckData(newDeck);
    console.log(deckData);
  };

  return (
    <div>
      {cardData.map((card, index) => (
        <button className="block" key={index} onClick={addCard}>
          <div className="border">
            <p>
              {card.cardName}, {card.id}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default CardView;
