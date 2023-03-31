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

// The Deckbuilder component will house any functionality relating to deck creation and submittal.

// TODO: BUG: Deckbuilder crashes server when deleting a users only deck.
// TODO: Somekind of notification and form clearing when a deck is created. Currently hard to tell when a deck has been successfully created.
// TODO: Trying to edit a deck populates DeckEditView with blank cards, no picture or numbers.

export default function Deckbuilder({ userId, handleDeckCreate, token }) {
  // cardData keeps an array of all cards.
  const [cardData, setCardData] = useState([]);
  // deckData keeps an array of all cards in the current deck.
  const [deckData, setDeckData] = useState([]);
  // decks keeps an array of all decks owned by the user.
  const [decks, setDecks] = useState([]);
  const [deckChoice, setDeckChoice] = useState();
  // deckTitleData keeps the value of the new deck title field, updating as it changes.
  const [deckTitleData, setDeckTitleData] = useState('');
  // deckBackData keeps the value of the deck back field, updating as it changes.
  const [deckBackData, setDeckBackData] = useState('Basic');
  // showModal determines the visibility of the modal.
  const [showModal, setShowModal] = useState(false);
  // The message to be displayed in the modal.
  const [message, setMessage] = useState('hi');

  // Fetch cards and check user decks from the server on every rerender.
  useEffect(() => {
    async function fetchCards() {
      const data = await API.getAllCards();
      for (let i = 0; i < data.length; i++) {
        const card = data[i];
        // Reflect the card data in the state.
        setCardData((prevCards) => [...prevCards, card]);
      }
    }
    // Refresh the card data.
    fetchCards();
    // Refresh the user deck data.
    syncUp();
  }, []);

  // Opens a modal with the given message.
  const Alert = (msg) => {
    setMessage(msg);
    setShowModal(true);
  };

  // Retrieves all user decks from the server.
  async function syncUp() {
    const response = await fetch(`${Static.serverUrl}/api/users/${userId}`);
    const data = await response.json();
    // Map the deck data to a more usable format.
    const deckMap = data.Decks.map((x) => {
      return { name: x.deckName, id: x.id };
    });
    // Reflect the deck data in the state.
    setDecks(deckMap);
  }

  // Finds a deck by id and returns the name and id of each card it contains.
  async function getSelectedDeck() {
    // Get and parse data.
    const submittedDeck = await fetch(`${Static.serverUrl}/api/decks/${deckChoice}`);
    const deckInfo = await submittedDeck.json();

    // Map the card data to a more usable format.
    const deckCards = await deckInfo.Cards.map((card) => {
      return {
        name: card.cardName,
        id: card.id,
      };
    });

    // Reflect the deck data in the state.
    setDeckData(deckCards);
  }

  // Deletes a deck from the server and refreshes the page.
  async function deleteSelectedDeck() {
    const submittedDeck = await API.deleteDeck(deckChoice, token);
    window.location.reload();
  }

  // Reflects the new deck name in the state whenever it changes.
  const handleDeckTitleSubmit = (e) => {
    e.preventDefault();
    setDeckTitleData(e.target.value);
  };

  // Refects the selected deck back in the state whenever it changes.
  const handleDeckBackSubmit = (e) => {
    e.preventDefault();
    setDeckBackData(e.target.alt);
  };

  // Handles the user submitting a deck.
  const handleDeckSubmit = (e) => {
    e.preventDefault();

    // Grab ids of all cards in deck data.
    const idData = deckData.map((card) => {
      return card.id;
    });
    // TODO: More catches for invalid deck creation.
    // Deck must contain at least 15 cards.
    if (idData.length < 15) {
      Alert('Please make sure your deck is at least 15 cards');
      return;
      // Create the deck.
    } else {
      handleDeckCreate({
        cardIds: idData,
        deckName: deckTitleData,
        backImage: deckBackData,
        userId: userId,
      });
    }
  };

  // Returns the modal element.
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
        <h1 className="title-text mt-8">Welcome to the Deckbuilder!</h1>
        <h1 className="heading-text">Create a New Deck:</h1>
        <p className="text-center text-xl font-main-text-f ">Each deck must have at least 15 unique cards. You can only have one copy of each card.</p>
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
              <CardView setDeckData={setDeckData} cardData={cardData} deckData={deckData} />
            </div>
            {/* Current Deck */}
            <div className="flex flex-col w-full h-1/2 md:h-full md:w-1/2 border border-neutral-700 p-4 rounded-lg bg-neutral-800">
              <h1 className='text-2xl font-main-text-f'>Current Build</h1>
              {/* DeckEditView shows the current cards in the deck */}
              <DeckEditView setDeckData={setDeckData} deckData={deckData} />
            </div>
          </div>
        </div>
        <div className='flex gap-4 flex-wrap justify-center w-full'>
          {/* Deck Options */}
          <div className='border flex flex-col md:flex-row items-center border-neutral-700 p-4 rounded-lg bg-neutral-800 gap-4'>
            {/* Deck Back */}
            <div className='border rounded-lg border-neutral-800'>
              <h2 className="text-center text-2xl font-main-text-f">Select Your Deck Back</h2>
              <div className="flex flex-row flex-wrap justify-center items-center gap-2 p-4">
                {/* Deck Back Options */}
                <img
                  className="border-black w-16 h-16 hover:scale-125 z-10"
                  src={`${Static.serverUrl}/api/images/cardback/Basic.png`}
                  alt="Basic"
                  onClick={handleDeckBackSubmit} />
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
            {/* Active Deck Back */}
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
            {/* Deck Name Selection and Create Button */}
            <div className='flex flex-col justify-around items-center border rounded-lg border-neutral-700 bg-neutral-800'>
              <h2 className="h2-text">Deck Name:</h2>
              <input type="textarea" className="mx-4 rounded-sm" value={deckTitleData} onChange={handleDeckTitleSubmit} />
              {/* Create Button */}
              <button type="button" className="button-style" onClick={handleDeckSubmit}>Create</button>
            </div>
          </div>
          {/* Deck Choice */}
          <div className="flex flex-col justify-around items-center border border-gray-700 rounded-lg bg-gray-800 p-3">
            <div>
              <label htmlFor="deckChoice" className="h2-text mx-6">Modify:</label>
              {/* Dropdown with decks the user has created. */}
              <select
                name="deck-choice"
                id="deckChoice"
                className="bg-black font-alt-text-f rounded"
                required
                // Store selected deck id in state.
                onChange={(e) => {
                  setDeckChoice(e.target.value);
                }}
              >
                {/* Populate the users deck names and id from state */}
                {decks.map((deck, i) => {
                  return (
                    <option className="font-alt-text-f" value={deck.id} key={i}>{deck.name}</option>
                  );
                })}
              </select>
            </div>
            {/* Edit and Delete Buttons */}
            <div className="flex">
              <button type="button" className="button-style" onClick={getSelectedDeck}>EDIT</button>
              <button type="button" className="delete-button-style" onClick={deleteSelectedDeck}>DELETE</button>
            </div>
          </div>
        </div>
      </div>
      {renderModal(message)}
    </div>
  );
}
