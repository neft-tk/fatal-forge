// The Handslot component represents any one slot where a card could be in the players hand.

// The Handslot component will never(?) be empty because players draw a new card when they play one from hand.

import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Card from '../../Card'
import Socket from '../../../utils/socket'

export default function Handslot({drawCard,index}) {
  const [currentCard, setCurrentCard] = useState(null);

  const draw = () =>{
    const card = drawCard();
    console.log(card);
    setCurrentCard(card);
    setAnimation(animation);
    setTimeout(()=>setAnimation({scale:1}), 500)
  }

  const removeAndDraw = ()=>{
    setCurrentCard(null);
    draw();
  }

  const animation = {
    scale: [0,1],
    transition:{
      ease:"easeIn", 
      duration:.5
    }
  }
  const [currentAnimation, setAnimation] = useState({scale:1});

  useState(()=>{
    draw();
  },[])

  return (
    <motion.div animate={currentAnimation} style={{backgroundColor:Socket.IO.color}} className={`flex flex-col justify-center items-center border w-[200px] h-[200px] relative`}>
      {currentCard ? <Card name={currentCard.name} compass={currentCard.compass} removeAndDraw={removeAndDraw} inPlay={false}/> : ''}
    </motion.div>
  )
}
