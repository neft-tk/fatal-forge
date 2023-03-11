// The Hand component contains all of the Handslots.

// Individual cards will be placed in a Handslot.

import React, { useEffect } from 'react'
import Handslot from './Handslot'

export default function Hand({ deck }) {
    const hand = [];

    const drawCard = () => {
        const rand = Math.floor(Math.random() * deck.length);
        const card = deck.splice(rand, 1)[0];
        return card;
    }

    const slots = Array(5).fill(null);

    return (
        <div className='flex justify-around p-3 bg-black/30 rounded-xl w-[90%] aspect-[5/1] max-h-[150px] min-h-[90px] mt-2'>
            {slots.map((x, i) => { return (<Handslot key={i} index={i} drawCard={drawCard} />) })}
        </div>
    )
}
