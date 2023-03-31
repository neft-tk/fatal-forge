import React, { useState } from "react";
// Modal
import { Button, Modal } from 'flowbite-react';
// Server URL
import Static from '../../../utils/staticHelper'

// The CardView component contains a pool of cards from which the player can draw from when deck building.

function CardView({ cardData, setDeckData, deckData }) {
  // showModal determines the visibility of the modal.
  const [showModal, setShowModal] = useState(false);
  // The message to be displayed in the modal.
  const [message, setMessage] = useState('hi');

  // Opens a modal with the given message.
  const Alert = (msg) => {
    setMessage(msg);
    setShowModal(true);
  };

  // Adds a card to the current deck.
  const addCard = (id) => {
    // Find the card.
    const newCard = cardData.find(x => x.id === id);
    // Check if the card is already in the deck.
    if (deckData.filter((card) => newCard.id === card.id).length === 1) {
      Alert('Cannot have more than one of the same card.');
      return;
    }
    // Add the card to the deck and set the new state.
    const newDeck = [...deckData];
    newDeck.push(newCard);
    setDeckData(newDeck);
  };

  // Returns the modal element.
  function renderModal() {
    return (
      <Modal show={showModal} size="md" popup={true}>
        <Modal.Header className="modal-header" />
        <Modal.Body className="modal-body">
          <div className="text-center">
            {/* Message */}
            <h3 className="mb-5 text-lg font-normal">{message}</h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => { setShowModal(false) }}>OK</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>)
  };

  return (
    <>
      {/* Container for the card pool */}
      <div className="flex flex-wrap justify-evenly items-center gap-3 overflow-y-auto overflow-x-hidden p-3 gl-scrollbar h-full rounded bg-main-bg">
        {cardData.map((card, index) => (
          // Map each card to a button, when clicked they will be added to deck.
          <button className="relative w-24 h-24 bg-neutral-700 hover:scale-125 hover:z-10 hover:border-2 hover:border-sky-500 font-tile-text-f" key={index}
            onClick={(e) => { e.preventDefault(); addCard(card.id); }}>
            {/* Top Number */}
            <h3 className='tile-top'>{card.topAttack}</h3>
            {/* Left Number */}
            <h3 className='tile-left'>{card.leftAttack}</h3>
            {/* Right Number */}
            <h3 className='tile-right'>{card.rightAttack}</h3>
            {/* Bottom Number */}
            <h3 className='tile-bottom'>{card.bottomAttack}</h3>
            {/* Art */}
            <img src={`${Static.serverUrl}/api/images/${card.imagePath}`} className='tile-art' alt='Visual representation of the card in play.'></img>
            {/* Card Frame */}
            <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face-2.svg`} className='w-full' alt='Card face.' />
          </button>
        ))}
      </div>
      {renderModal(message)}
    </>
  );
}

export default CardView;
