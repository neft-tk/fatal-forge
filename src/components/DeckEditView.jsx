import React, { useEffect, useState } from "react";

function DeckEditView({ setDeckData, deckData }) {


    useEffect(() => {
        console.log('data',deckData)
    },[deckData]);


    return (
        <div>
            {deckData.map((card) => 
                
            <div key={card.id} className="border">
                <p>{card.name}</p>
            </div>
                
            )}            
        </div>
    )

}

export default DeckEditView;