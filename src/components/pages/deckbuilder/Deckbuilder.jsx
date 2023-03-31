// React + Components
import React, { useEffect, useState } from 'react';
import CardView from './CardView';
import DeckEditView from './DeckEditView';
// Modal and Button are from the Flowbite React UI Library
import { Button, Modal } from 'flowbite-react';
// API calls
import API from '../../../utils/API';
// Server URL
import Static from '../../../utils/staticHelper';

// The Deckbuilder component will house any functionality relating to deck creation and submittal.`

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
  }

  async function deleteSelectedDeck() {
    const submittedDeck = await API.deleteDeck(deckChoice, token);
    window.location.reload();
  }

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
        <Modal.Header className="modal-header" />
        <Modal.Body className="modal-body">
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal">
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
    <div className="flex flex-col justify-center p-3 overflow-x-hidden gl-scrollbar">
      {/* Page heading and instructions */}
      <div>
        <h1 className="title-text mt-8">
          Welcome to the Deckbuilder!
        </h1>
        <h1 className="heading-text">
          Create a New Deck:
        </h1>
        <p className="text-center text-xl font-main-text-f ">
          Each deck must have at least 15 unique cards. You can only have one
          copy of each card.
        </p>
      </div>
      {/* Deckbuilder and Options UI */}
      <div className="flex flex-col justify-center items-center text-center">
        {/* Deck Builder */}
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row p-4 h-[80vh] md:h-[55vh] gap-6">
            {/* Card Pool */}
            <div className="flex flex-col w-full h-1/2 md:h-full md:w-1/2 border border-neutral-700 p-4 rounded-lg bg-neutral-800">
              <h1 className='text-2xl font-main-text-f'>Pool</h1>
              {/* CardView returns all cards in the card pool. */}
              <CardView
                setDeckData={setDeckData}
                cardData={cardData}
                deckData={deckData}
              />
            </div>
            {/* Current Deck */}
            <div className="flex flex-col w-full h-1/2 md:h-full md:w-1/2 border border-neutral-700 p-4 rounded-lg bg-neutral-800">
              <h1 className='text-2xl font-main-text-f'>Current Build</h1>
              {/* DeckEditView shows the current cards in the deck */}
              <DeckEditView setDeckData={setDeckData} deckData={deckData} />
            </div>
          </div>
        </div>
        {/* Options */}
        <div className='flex gap-4 flex-wrap justify-center w-full'>
          <div className='border flex flex-col md:flex-row items-center border-neutral-700 p-4 rounded-lg bg-neutral-800 gap-4'>
            <div className='border rounded-lg border-neutral-800'>
              <h2 className="text-center text-2xl font-main-text-f">
                Select Your Deck Back
              </h2>
              <div className="flex flex-row flex-wrap justify-center items-center gap-2 p-4">
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Basic.png`}
                  alt="Basic"
                  onClick={handleDeckBackSubmit}
                />
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Cross.png`}
                  alt="Cross"
                  onClick={handleDeckBackSubmit}
                />
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Fluid-Rune.png`}
                  alt="Fluid-Rune"
                  onClick={handleDeckBackSubmit}
                />
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Glowing-Rune.png`}
                  alt="Glowing-Rune"
                  onClick={handleDeckBackSubmit}
                />
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Grounded-Rune.png`}
                  alt="Grounded-Rune"
                  onClick={handleDeckBackSubmit}
                />
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Star.png`}
                  alt="Star"
                  onClick={handleDeckBackSubmit}
                />
              </div>
            </div>
            <div className="flex flex-col deck-editor p-4 border rounded-lg border border-neutral-800 ">
              <div className="flex flex-col items-center">
                <h3 className="text-center text-2xl font-main-text-f">
                  Active:
                </h3>
                <img
                  className="border-black w-20 h-20 m-2"
                  src={`${Static.serverUrl}/api/images/cardback/${deckBackData}.png`}
                  alt={deckBackData}
                />
              </div>
            </div>
            <div className='flex flex-col justify-around items-center border rounded-lg border-neutral-700 bg-neutral-800'>
              <h2 className="h2-text">
                Deck Name:
              </h2>
              <input
                type="textarea"
                className="mx-4 rounded-sm"
                value={deckTitleData}
                onChange={handleDeckTitleSubmit}
              />
              <button
                type="button"
                className="button-style"
                onClick={handleDeckSubmit}
              >
                Create
              </button>
            </div>
          </div>

          {/* Deck Choice */}
          <div className="flex flex-col justify-around items-center border border-gray-700 rounded-lg bg-gray-800 p-3">
            <div>
              <label
                htmlFor="deckChoice"
                className="h2-text mx-6"
              >
                Modify:
              </label>
              <select
                name="deck-choice"
                id="deckChoice"
                className="bg-black font-alt-text-f rounded"
                required
                onChange={(e) => {
                  setDeck(e.target.value);
                  setDeckChoice(e.target.value);
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
            <div className="flex">
              <button
                type="button"
                className="button-style"
                onClick={getSelectedDeck}
              >
                EDIT
              </button>
              <button
                type="button"
                className="delete-button-style"
                onClick={deleteSelectedDeck}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
      {renderModal(message)}
    </div>
  );
}
