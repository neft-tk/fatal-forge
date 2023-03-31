import React from "react";
import Static from '../utils/staticHelper'

function DeckEditView({ setDeckData, deckData }) {

    const removeCard = (id) => {
        const newDeck = [...deckData.filter(x => x.id != id)];
        setDeckData(newDeck);
    }

    return (
        <div className="flex flex-wrap gap-2 overflow-y-auto overflow-x-hidden p-3 gl-scrollbar h-full bg-main-bg">
            {deckData.map((card, index) =>
                <button className="relative w-24 h-24 bg-neutral-700 hover:scale-125 hover:z-10 hover:border-2 font-tile-text-f hover:border-sky-500" key={index} onClick={(e) => { e.preventDefault(); removeCard(card.id) }}>
                    {/* Top Number*/}
                    <h3 className='tile-top'>{card.topAttack}</h3>
                    {/* Left Number */}
                    <h3 className='tile-left'>{card.leftAttack}</h3>
                    {/* Right Number */}
                    <h3 className='tile-right'>{card.rightAttack}</h3>
                    {/* Bottom Number */}
                    <h3 className='tile-bottom'>{card.bottomAttack}</h3>
                    {/* Art */}
                    <img src={`${Static.serverUrl}/api/images/${card.imagePath}`} className='tile-art' alt='Visual representation of the card in play.'></img>
                    {/* Card  */}
                    <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face-2.svg`} className='w-full' alt='card face.' />
                </button>
            )}
        </div>
    )

}

export default DeckEditView;