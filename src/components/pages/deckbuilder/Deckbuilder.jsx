// The Deckbuilder component will house any functionality relating to deck creation and submittal.

import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
// import Card from '../../Card';
import CardView from "../../CardView";
import DeckEditView from "../../DeckEditView";
import CardBack from "../../CardBack";

export default function Deckbuilder({ userId, handleDeckCreate }) {
  const [cardData, setCardData] = useState([]);
  const [deckData, setDeckData] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const data = await API.getCards();
      for (let i = 0; i < data.length; i++) {
        const card = data[i];
        setCardData((prevCards) => [...prevCards, card]);
      }
    }
    fetchCards();
  }, []);

  const handleDeckSubmit = (e) => {
    e.preventDefault();

    const idData = deckData.map((card) => {
      return card.id;
    });


    if(idData.length < 10) {
      return alert('Please make sure your deck is 10 cards')
    } else {
      handleDeckCreate({
        cardIds: idData,
        deckName: "second deck",
        backImage: "Basic",
        UserId: userId,
      })
    }

  };

  return (
    <>
      <div className="text-center">Deckbuilder</div>
      <h1 className="text-center">Welcome to the Deckbuilder!</h1>
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col deck-editor p-4">
          <h2>All Cards:</h2>
          <div className="flex flex-col justify-start overflow-auto max-h-40 max-w-md">
            <CardView
              setDeckData={setDeckData}
              cardData={cardData}
              deckData={deckData}
            />
          </div>
        </div>
        <div className="flex flex-col deck-editor p-4">
          <h2>Current Deck Build:</h2>
          <div className="overflow-auto max-h-40 max-w-md">
            <DeckEditView setDeckData={setDeckData} deckData={deckData} />
          </div>
          <h2>Select Your Deck Back:</h2>
          <CardBack/>
          <li>Basic</li>
          <li>Cross</li>
          <li>Fluid-Rune</li>
          <li>Glowing-Rune</li>
          <li>Grounded-Rune</li>
          <li>Star</li>
          <button type="button" className="border m-10" onClick={handleDeckSubmit}>
            Submit Your Deck
          </button>
        </div>
      </div>
    </>
  );
}
