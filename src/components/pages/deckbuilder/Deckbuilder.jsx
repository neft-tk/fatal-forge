// The Deckbuilder component will house any functionality relating to deck creation and submittal.

import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
// import Card from '../../Card';
import CardView from "../../CardView";
import DeckEditView from "../../DeckEditView";
import Static from "../../../utils/staticHelper";
import { async } from "q";

export default function Deckbuilder({ userId, handleDeckCreate, token }) {
  const [cardData, setCardData] = useState([]);
  const [deckData, setDeckData] = useState([]);
  const [deck, setDeck] = useState();
  const [decks, setDecks] = useState([]);
  const [deckChoice, setDeckChoice] = useState();
  const [deckChoiceName, setDeckChoiceName] = useState("")
  const [deckTitleData, setDeckTitleData] = useState("");
  const [deckBackData, setDeckBackData] = useState("Basic");

  useEffect(() => {
    async function fetchCards() {
      const data = await API.getAllCards();
      for (let i = 0; i < data.length; i++) {
        const card = data[i];
        setCardData((prevCards) => [...prevCards, card]);
      }
    }
    fetchCards();
    syncUp();
  }, []);

  async function syncUp() {
    const r = await fetch(`${Static.serverUrl}/api/users/${userId}`);
    const d = await r.json();

    const deckMap = d.Decks.map((x) => {
      return { name: x.deckName, id: x.id };
    });
    setDecks(deckMap);
  }

  async function getSelectedDeck() {
    const submittedDeck = await fetch(`${Static.serverUrl}/api/decks/${deckChoice}`)
    const deckInfo = await submittedDeck.json()
    const deckCards = await deckInfo.Cards.map((card) => {
      return {
        name: card.cardName,
        id: card.id,
      }
    })
    setDeckData(deckCards)
    setDeckChoiceName(deckInfo.deckName)
    // const deconstructedDeck = await 
  }

  async function deleteSelectedDeck() {
    console.log(deckChoice)
    const submittedDeck = await API.deleteDeck(deckChoice, token)
    console.log("deck deleted")
    window.location.reload();
  }

  // async function findOneDeck() {
  //   const selectedDeck = await API.getSingleDeck(deckChoice)
  //   const deconstructedDeck = await selectedDeck.json()
  //   console.log(deckChoice)
  //   setDeckChoiceName(deckChoice)
  // }

  const handleDeckTitleSubmit = (e) => {
    setDeckTitleData(e.target.value);
  };

  const handleDeckBackSubmit = (e) => {
    e.preventDefault();
    setDeckBackData(e.target.alt);
  };

  const handleDeckSubmit = (e) => {
    e.preventDefault();

    const idData = deckData.map((card) => {
      return card.id;
    });

    if (idData.length < 15) {
      return alert("Please make sure your deck is 10 cards");
    } else {
      handleDeckCreate({
        cardIds: idData,
        deckName: deckTitleData,
        backImage: deckBackData,
        userId: userId,
      });
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-main-text-f m-6">Welcome to the Deckbuilder!</h1>
      <h1 className="text-center text-3xl font-main-text-f">Select an old deck to edit here:</h1>

      {/* Deck Choice */}
      <div className="flex flex-row justify-evenly items-center">
        <div>
        <label
          htmlFor="deckChoice"
          className="m-2 font-bold text-2xl font-main-text-f"
        >
          Choose Your Deck:
        </label>
        <select
          name="deck-choice"
          id="deckChoice"
          className="bg-black font-alt-text-f rounded"
          required
          onChange={(e) => {
            setDeck(e.target.value);
            setDeckChoice(e.target.value);
            console.log(e.target.value);
          }}
        >
          {decks.map((x, i) => {
            return (
              <option className="font-alt-text-f" value={x.id} key={i}>
                {x.name}
              </option>
            );
          })}
        </select>
        </div>
        <div className="flex flex-col">
        <button type="button" className="bg-highlight-orange hover:bg-active-orange text-white font-bold py-2 px-4 rounded m-2" onClick={getSelectedDeck}>Edit This Deck!</button>
        <button type="button" className="bg-red-800 hover:bg-active-orange text-white font-bold py-2 px-4 rounded m-2" onClick={deleteSelectedDeck}>DELETE This Deck!</button>
        </div>
      </div>

      <h1 className="text-center text-3xl font-main-text-f">Create a New Deck Below:</h1>
      
      <h2 className="text-center text-2xl font-main-text-f mx-10">Deck Title:
          <input
            type="textarea"
            className="mx-2 rounded-sm"
            value={deckTitleData}
            onChange={handleDeckTitleSubmit}
          />
      </h2>


      <div className="flex flex-row justify-items-stretch">
        <div className="flex flex-col deck-editor p-4">
          <h2 className="text-2xl font-main-text-f">All Cards:</h2>
          <div className="flex flex-col justify-start overflow-auto max-h-40 max-w-md">
            <CardView
              setDeckData={setDeckData}
              cardData={cardData}
              deckData={deckData}
            />
          </div>
        </div>
        <div className="flex flex-col deck-editor p-4">
          <h2 className="text-2xl font-main-text-f">Current Deck Build: {deckChoiceName}</h2>
          <div className="flex flex-col justify-start overflow-auto gl-scrollbar">
            <DeckEditView setDeckData={setDeckData} deckData={deckData} />
          </div>
          <h2 className="text-center text-2xl font-main-text-f">Select Your Deck Back:</h2>
          <div className="flex flex-col items-center">
          <h3 className="text-center text-2xl font-main-text-f">Currently Selected Deck Back:</h3> 
          <h3 className="text-center text-2xl font-main-text-f">{deckBackData}</h3>
          <img 
          className="border-black w-20 h-20 m-2" 
          src={`${Static.serverUrl}/api/images/cardback/${deckBackData}.png`}
          alt={deckBackData}/>
          </div>
          <div className="flex flex-row">
            <img
              className="border-black w-20 h-20 m-2"
              src={`${Static.serverUrl}/api/images/cardback/Basic.png`}
              alt="Basic"
              onClick={handleDeckBackSubmit}
            />
            <img
              className="border-black w-20 h-20 m-2"
              src={`${Static.serverUrl}/api/images/cardback/Cross.png`}
              alt="Cross"
              onClick={handleDeckBackSubmit}
            />
            <img
              className="border-black w-20 h-20 m-2"
              src={`${Static.serverUrl}/api/images/cardback/Fluid-Rune.png`}
              alt="Fluid-Rune"
              onClick={handleDeckBackSubmit}
            />
            <img
              className="border-black w-20 h-20 m-2"
              src={`${Static.serverUrl}/api/images/cardback/Glowing-Rune.png`}
              alt="Glowing-Rune"
              onClick={handleDeckBackSubmit}
            />
            <img
              className="border-black w-20 h-20 m-2"
              src={`${Static.serverUrl}/api/images/cardback/Grounded-Rune.png`}
              alt="Grounded-Rune"
              onClick={handleDeckBackSubmit}
            />
            <img
              className="border-black w-20 h-20 m-2"
              src={`${Static.serverUrl}/api/images/cardback/Star.png`}
              alt="Star"
              onClick={handleDeckBackSubmit}
            />
          </div>
          <button
            type="button"
            className="bg-highlight-orange hover:bg-active-orange text-white font-bold py-2 px-4 rounded m-2"
            onClick={handleDeckSubmit}
          >
            Submit Your Deck
          </button>
        </div>
      </div>
    </>
  );
}
