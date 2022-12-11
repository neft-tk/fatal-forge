// The Handslot component represents any one slot where a card could be in the players hand.

// The Handslot component will never(?) be empty because players draw a new card when they play one from hand.

import React, { useState } from 'react'
import Card from '../../Card'

export default function Handslot({drawCard,index}) {
  const [currentCard, setCurrentCard] = useState(null);
  const draw = () =>{
    const card = drawCard();
    console.log(card);
    setCurrentCard(card);
  }
  useState(()=>{
    draw();
  },[])

  return (
    <div className={`flex flex-col justify-center items-center border w-[200px] h-[200px] relative`}>
      <h3 className='absolute'>slot {index}</h3>
      {currentCard ? <Card name={currentCard.name} compass={currentCard.compass}/> : ''}
    </div>
  )
}
