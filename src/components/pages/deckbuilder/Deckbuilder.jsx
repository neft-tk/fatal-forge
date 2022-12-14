// The Deckbuilder component will house any functionality relating to deck creation and submittal.

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import API from '../../../utils/API';
// import Card from '../../Card';
import CardView from '../../CardView';
import DeckEditView from '../../DeckEditView';
import Static from '../../../utils/staticHelper';
import { async } from 'q';

export default function Deckbuilder({ userId, handleDeckCreate, token }) {
  const [cardData, setCardData] = useState([]);
  const [deckData, setDeckData] = useState([]);
  const [deck, setDeck] = useState();
  const [decks, setDecks] = useState([]);
  const [deckChoice, setDeckChoice] = useState();
  const [deckChoiceName, setDeckChoiceName] = useState('');
  const [deckTitleData, setDeckTitleData] = useState('');
  const [deckBackData, setDeckBackData] = useState('Basic');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('hi');

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

  const Alert = (msg) => {
    setMessage(msg);
    console.log(msg);
    setShowModal(true);
  };

  async function syncUp() {
    const r = await fetch(`${Static.serverUrl}/api/users/${userId}`);
    const d = await r.json();

    const deckMap = d.Decks.map((x) => {
      return { name: x.deckName, id: x.id };
    });
    setDecks(deckMap);
  }

  async function getSelectedDeck() {
    const submittedDeck = await fetch(
      `${Static.serverUrl}/api/decks/${deckChoice}`
    );
    const deckInfo = await submittedDeck.json();
    const deckCards = await deckInfo.Cards.map((card) => {
      return {
        name: card.cardName,
        id: card.id,
      };
    });
    setDeckData(deckCards);
    setDeckChoiceName(deckInfo.deckName);
    // const deconstructedDeck = await
  }

  async function deleteSelectedDeck() {
    console.log(deckChoice);
    const submittedDeck = await API.deleteDeck(deckChoice, token);
    console.log('deck deleted');
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
      Alert('Please make sure your deck is at least 15 cards');
      return;
    } else {
      handleDeckCreate({
        cardIds: idData,
        deckName: deckTitleData,
        backImage: deckBackData,
        userId: userId,
      });
    }
  };

  function renderModal() {
    return (
      <Modal show={showModal} size="md" popup={true}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="gray"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="m-8 flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-main-text-f m-6">
        Welcome to the Deckbuilder!
      </h1>
      <h1 className="text-center text-3xl font-main-text-f">
        Edit an Existing Deck:
      </h1>

      {/* Deck Choice */}
      <div className="flex flex-row justify-around items-center my-12 w-1/2">
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
          <button
            type="button"
            className="bg-highlight-orange hover:bg-active-orange text-white font-bold py-2 px-4 rounded m-2"
            onClick={getSelectedDeck}
          >
            EDIT This Deck!
          </button>
          <button
            type="button"
            className="bg-red-800 hover:bg-active-orange text-white font-bold py-2 px-4 rounded m-2"
            onClick={deleteSelectedDeck}
          >
            DELETE This Deck!
          </button>
        </div>
      </div>

      <div className="p-2">
        <h1 className="text-center text-3xl font-main-text-f">
          Create a New Deck:
        </h1>
        <p className="text-center text-xl font-main-text-f my-6">
          Each deck must have at least 15 unique cards. You can only have one
          copy of each card.
        </p>

        <h2 className="text-center text-2xl font-main-text-f mx-10">
          Deck Name:
          <input
            type="textarea"
            className="mx-4 rounded-sm"
            value={deckTitleData}
            onChange={handleDeckTitleSubmit}
          />
        </h2>

        <div className="flex flex-col my-8 justify-center items-center text-center">
          <h2 className="text-2xl font-main-text-f">
            Current Deck Build: {deckChoiceName}
          </h2>
          <div className="flex justify-between">
            <div className="flex flex-col deck-editor p-4">
              <h2 className="text-2xl font-main-text-f my-8">All Cards:</h2>
              <div className="flex flex-col justify-start overflow-auto max-h-72 max-w-md">
                <CardView
                  setDeckData={setDeckData}
                  cardData={cardData}
                  deckData={deckData}
                />
              </div>
            </div>
            <div className="flex flex-col deck-editor p-4">
              <div className="flex flex-col justify-start overflow-auto gl-scrollbar">
                <DeckEditView setDeckData={setDeckData} deckData={deckData} />
              </div>
              <h2 className="text-center text-2xl font-main-text-f my-8">
                Select Your Deck Back
              </h2>
              <div className="flex flex-col items-center">
                <h3 className="text-center text-2xl font-main-text-f">
                  Currently Selected:
                </h3>
                <h3 className="text-center text-2xl font-main-text-f">
                  {deckBackData}
                </h3>
                <img
                  className="border-black w-20 h-20 m-2"
                  src={`${Static.serverUrl}/api/images/cardback/${deckBackData}.png`}
                  alt={deckBackData}
                />
              </div>
              <div className="flex flex-row my-6">
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
            </div>
          </div>
          <button
            type="button"
            className="bg-highlight-orange hover:bg-active-orange text-white font-bold p-6 rounded my-6"
            onClick={handleDeckSubmit}
          >
            Submit Your Deck
          </button>
        </div>
      </div>
      {renderModal(message)}
    </div>
  );
}
