// The Hand component contains all of the Handslots.

// Individual cards will be placed in a Handslot.

import React, { useEffect } from 'react'
import Handslot from './Handslot'

export default function Hand({deck}) {
    const hand = [];

    useEffect(()=>{
        for(let i = 0; i <5; i++){
            hand.push(drawCard());
        }
    },[]);
    
    const drawCard = ()=>{
        console.log(deck);
        const rand = Math.floor(Math.random * deck.length);
        const card = deck.splice(rand,1)[0];
        return card;
      }

    const slots = Array(5).fill(null);

    return (
        <div className='flex w-7/8 justify-between'>
            {slots.map((x,i)=>{return(<Handslot key={i} index={i} card={hand[i]} drawCard={drawCard}/>)})}
        </div>
    )
}
    