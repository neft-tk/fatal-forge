import React, { useState } from "react";
import { Button, Modal } from 'flowbite-react';
import Static from '../utils/staticHelper'

function CardView({ cardData, setDeckData, deckData }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('hi');

  const Alert = (msg) => {
    setMessage(msg);
    setShowModal(true);
  };

  const addCard = (id) => {
    const newCard = cardData.find(x => x.id == id);

    if (deckData.filter((card) =>
      newCard.id == card.id
    ).length === 1) {
      Alert('Cannot have more than one of the same card.');
      return;
    }

    const newDeck = [...deckData];
    newDeck.push(newCard);
    setDeckData(newDeck);
  };

  function renderModal() {
    return (<Modal
      show={showModal}
      size="md"
      popup={true}
    >
      <Modal.Header className="modal-header" />
      <Modal.Body className="modal-body">
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="gray"
              onClick={() => { setShowModal(false) }}
            >
              OK
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>)
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-2 overflow-y-auto overflow-x-hidden p-3 gl-scrollbar h-full bg-main-bg">
        {cardData.map((card, index) => (
          <button className="relative w-24 h-24 bg-neutral-700 hover:scale-125 hover:z-10 hover:border-2 hover:border-sky-500 font-tile-text-f" key={index}
            onClick={
              (e) => {
                e.preventDefault();
                addCard(card.id);
              }}
          >
            {/* Top Number */}
            <h3 className='tile-top'>{card.topAttack}</h3>
            {/* Left Number */}
            <h3 className='tile-left'>{card.leftAttack}</h3>
            {/* Right Number */}
            <h3 className='tile-right'>{card.rightAttack}</h3>
            {/* Bottom Number */}
            <h3 className='tile-bottom'>{card.bottomAttack}</h3>
            <img src={`${Static.serverUrl}/api/images/${card.imagePath}`} className='w-1/2 h-1/2 absolute left-[25%] top-[25%]' alt='Visual representation of the card in play.'></img>
            <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face-2.svg`} className='w-full' alt='Card face.' />
          </button>
        ))}
      </div>
      {renderModal(message)}
    </>
  );
}

export default CardView;
