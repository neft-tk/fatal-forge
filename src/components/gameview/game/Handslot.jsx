// The Handslot component represents any one slot where a card could be in the players hand.

// The Handslot component will never(?) be empty because players draw a new card when they play one from hand.

import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    draw();
  }, [])

  const [size,setSize] = useState({x:100,y:100})

  useEffect(()=>{
    const div = document.querySelector(`#hand-${index}`)
    if (div){
      const rect = div.getBoundingClientRect();
      setSize({x:rect.width,y:rect.height})
    }
  },[])

  return (
    <motion.div id={`hand-${index}`} animate={currentAnimation} whileHover={{ scale: 1.2 }} style={{ backgroundColor: Socket.IO.color }} className={`flex justify-center h-full aspect-square hover:scale-125`}>
      {currentCard ? <Card name={currentCard.name} compass={currentCard.compass} imagePath={currentCard.imagePath} removeAndDraw={removeAndDraw} inPlay={false} slotIndex={index} size={size} /> : ''}
    </motion.div>
  )
}
