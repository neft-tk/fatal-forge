import React from "react";
// Server URL
import Static from '../../../../utils/staticHelper'

// DeckEditView is the view that displays the current deck being edited or created.
// It handles the population of cards and the removal of cards from the deck.

export default function DeckEditView({ setDeckData, deckData }) {

    // Removes a card from the current deck using the card id.
    const removeCard = (id) => {
        // Filter out the card with the matching id.
        const newDeck = [...deckData.filter(x => x.id !== id)];
        // Set the new state of the deck.
        setDeckData(newDeck);
    }

    return (
        <div className="flex flex-wrap align-middle justify-evenly gap-3 overflow-y-auto overflow-x-hidden p-3 gl-scrollbar h-full bg-main-bg rounded">
            {deckData.map((card, index) =>
                <button className="relative w-24 h-24 bg-neutral-700 hover:scale-110 hover:z-10 hover:border-2 font-tile-text-f transition-all " key={index} onClick={(e) => { e.preventDefault(); removeCard(card.id) }}>
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
                    {/* Card Frame */}
                    <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face-2.svg`} className='w-full' alt='card face.' />
                </button>
            )}
        </div>
    )

}
