// The Deckbuilder component will house any functionality relating to deck creation and submittal.

import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
// import Card from '../../Card';
import CardView from "../../CardView";
import DeckEditView from "../../DeckEditView";
import Static from "../../../utils/staticHelper";


export default function Deckbuilder({ userId, handleDeckCreate }) {
  const [cardData, setCardData] = useState([]);
  const [deckData, setDeckData] = useState([]);
  const [deckTitleData, setDeckTitleData] = useState('')
  const [deckBackData, setDeckBackData] = useState('')

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

  const handleDeckTitleSubmit = (e) => {
    setDeckTitleData(e.target.value);
  }

  const handleDeckBackSubmit = (e) => {
    e.preventDefault();
    setDeckBackData(e.target.alt)
  }

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
        deckName: deckTitleData,
        backImage: deckBackData,
        userId: userId,
      })
    }

  };

  return (
    <>
      <div className="text-center">Deckbuilder</div>
      <h1 className="text-center">Welcome to the Deckbuilder!</h1>
      <h1 className="text-center">Create a New Deck Below:</h1>
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
          <h2>Deck Title:</h2>
          <input type="textarea" value={deckTitleData} onChange={handleDeckTitleSubmit}/>
          <h2>Current Deck Build:</h2>
          <div className="max-h-40 max-w-md">
            <DeckEditView 
            setDeckData={setDeckData} 
            deckData={deckData} />
          </div>
          <h2>Select Your Deck Back:</h2>
          <h3>Currently Selected Deck Back: {deckBackData}</h3>
          <div className="">
          <li>Basic</li>
          <img 
          className="border-black w-20 h-20" 
          src={`${Static.serverUrl}/api/images/cardback/Basic.png`}
          alt="Basic"
          onClick={handleDeckBackSubmit}
          />
          <li>Cross</li>
          <img 
          className="border-black w-20 h-20" 
          src={`${Static.serverUrl}/api/images/cardback/Cross.png`}
          alt="Cross"
          onClick={handleDeckBackSubmit}
          />
          <li>Fluid-Rune</li>
          <img 
          className="border-black w-20 h-20" 
          src={`${Static.serverUrl}/api/images/cardback/Fluid-Rune.png`}
          alt="Fluid-Rune"
          onClick={handleDeckBackSubmit}
          />
          <li>Glowing-Rune</li>
          <img 
          className="border-black w-20 h-20" 
          src={`${Static.serverUrl}/api/images/cardback/Glowing-Rune.png`}
          alt="Glowing-Rune"
          onClick={handleDeckBackSubmit}
          />
          <li>Grounded-Rune</li>
          <img 
          className="border-black w-20 h-20" 
          src={`${Static.serverUrl}/api/images/cardback/Grounded-Rune.png`}
          alt="Grounded-Rune"
          onClick={handleDeckBackSubmit}
          />
          <li>Star</li>
          <img 
          className="border-black w-20 h-20" 
          src={`${Static.serverUrl}/api/images/cardback/Star.png`}
          alt="Star"
          onClick={handleDeckBackSubmit}
          />
          </div>
          <button type="button" className="border m-10" onClick={handleDeckSubmit}>
            Submit Your Deck
          </button>
        </div>
      </div>
    </>
  );
}
