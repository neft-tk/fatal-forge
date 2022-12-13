import React, { useEffect, useState } from "react";

function DeckEditView({ setDeckData, deckData }) {

    const removeCard = (e) => {
        e.preventDefault();
        const selectedCard = e.target.innerHTML;
        console.log(selectedCard)

        const newDeck = [...deckData];
        newDeck.pop(selectedCard);
        setDeckData(newDeck);
    }



    useEffect(() => {
        console.log('data',deckData)
    },[deckData]);


    return (
        <div>
            {deckData.map((card, index) => 
            <button className="border" key={index} onClick={removeCard}>    
                <div className="border">
                    <p>{card.name}</p>
                </div>     
            </button>           
            )} 
        </div>
    )

}

export default DeckEditView;