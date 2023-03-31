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
          <button className="relative w-24 h-24 bg-neutral-700 hover:scale-125 hover:z-10 hover:border-2 hover:border-sky-500" key={index}
            onClick={
              (e) => {
                e.preventDefault();
                addCard(card.id);
              }}
          >
            <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mt-[-10px] left-[50%] top-[11%] text-center z-10 text-black font-bold'>{card.topAttack}</h3>
            <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mt-[-10px] left-[14%] top-[48%] text-center z-10 text-black font-bold'>{card.leftAttack}</h3>
            <h3 className='absolute w-[20px] h-[20px] mr-[-10px] mt-[-10px] right-[13%] top-[48%] text-center z-10 text-black font-bold'>{card.rightAttack}</h3>
            <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mb-[-10px] left-[50%] bottom-[16%] text-center z-10 text-black font-bold'>{card.bottomAttack}</h3>
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
