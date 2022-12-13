// The Handslot component represents any one slot where a card could be in the players hand.

// The Handslot component will never(?) be empty because players draw a new card when they play one from hand.

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../Card'
import Socket from '../../../utils/socket'
import state from '../../../utils/staticHelper';

export default function Handslot({ drawCard, index }) {
  const [currentCard, setCurrentCard] = useState(null);

  const draw = () => {
    const card = drawCard();

    console.log(card);
    setCurrentCard(card);
    setAnimation(animation);
    setTimeout(() => setAnimation({ scale: 1 }), 500)


    setTimeout(() => {
      //todo: this timeout is a hack, should reconsider how properly change this
      state.hand.set(index, card);
    }, 2000)
  }

  const removeAndDraw = () => {
    setCurrentCard(null);
    draw();
  }

  const animation = {
    scale: [0, 1],
    transition: {
      ease: "easeIn",
      duration: .5
    }
  }
  const [currentAnimation, setAnimation] = useState({ scale: 1 });

  useState(() => {
    draw();
  }, [])

  return (
    <motion.div animate={currentAnimation} style={{ backgroundColor: Socket.IO.color }} className={`flex justify-center w-[20%] aspect-square mx-2`}>
      <div className='border border-white/30 rounded w-full h-full shrink grow overflow-hidden'>
      {currentCard ? <Card name={currentCard.name} compass={currentCard.compass} imagePath={currentCard.imagePath} removeAndDraw={removeAndDraw} inPlay={false} slotIndex={index} /> : ''}
      </div>
    </motion.div>
  )
}
