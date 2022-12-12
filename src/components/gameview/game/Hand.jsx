// The Hand component contains all of the Handslots.

// Individual cards will be placed in a Handslot.

import React, { useEffect } from 'react'
import Handslot from './Handslot'

export default function Hand({deck}) {
    const hand = [];

    const drawCard = ()=>{
        console.log(deck);
        const rand = Math.floor(Math.random() * deck.length);
        console.log(rand);
        const card = deck.splice(rand,1)[0];
        return card;
    }

    const slots = Array(5).fill(null);

    return (
        <div className='flex justify-between'>
            {slots.map((x,i)=>{return(<Handslot key={i} index={i} drawCard={drawCard}/>)})}
        </div>
    )
}
    