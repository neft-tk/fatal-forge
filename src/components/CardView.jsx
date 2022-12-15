import React, { useState } from "react";
import { Button, Modal} from 'flowbite-react';
// import Deckbuilder, { addCard } from "./pages/deckbuilder/Deckbuilder";

function CardView({ cardData, setDeckData, deckData}) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('hi');

  const Alert = (msg) =>{
    setMessage(msg);
    console.log(msg);
    setShowModal(true);
  };

  const addCard = (e) => {
    e.preventDefault();
    const newCardName = e.target.innerHTML.split(",");
    const newCard = {
      name: newCardName[1],
      id: newCardName[0],
    };
    // console.log(newCard);
    if(deckData.filter((card) => 
      newCard.id == card.id
    ).length === 1) {
      Alert('Cannot have more than one of the same card.');
      return;
    }

    const newDeck = [...deckData];
    newDeck.push(newCard);
    setDeckData(newDeck);
    // console.log(deckData);
  };

  function renderModal(){
    return(    <Modal
      show={showModal}
      size="md"
      popup={true}
      >
        <Modal.Header className="modal-header"/>
        <Modal.Body className="modal-body">
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="gray"
                onClick={()=>{setShowModal(false)}}
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
      <div>
        {cardData.map((card, index) => (
          <button className="block min-w-full" key={index} onClick={addCard}>
            <div className="text-start border text-xl font-main-text-f">
              <p>
                {card.id}, {card.cardName}, L:{card.leftAttack}, R:{card.rightAttack}, T:{card.topAttack}, B:{card.bottomAttack}
              </p>
            </div>
          </button>
        ))}
      </div>
      {renderModal(message)}
    </>
  );
}

export default CardView;
