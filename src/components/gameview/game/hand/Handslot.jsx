import React, { useState, useEffect } from 'react'
// Card component.
import Card from '../Card'
// Framer motion.
import { motion } from 'framer-motion'
// Utilities
import Socket from '../../../../utils/socket'
import state from '../../../../utils/staticHelper';

// The Handslot component represents any one slot where a card could be in the players hand.

export default function Handslot({ drawCard, index }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [currentAnimation, setAnimation] = useState({ scale: 1 });
  const [size, setSize] = useState({ x: 100, y: 100 })

  // On page load, execute the draw function.
  useEffect(() => {
    draw();
  }, [])

  // On page load, get the size of the div and set it as the size of the card.
  useEffect(() => {
    const div = document.querySelector(`#hand-${index}`)
    if (div) {
      const rect = div.getBoundingClientRect();
      setSize({ x: rect.width, y: rect.height })
    }
  }, [])

  // Animation object for when a card is "drawn".
  const animation = {
    scale: [0, 1],
    transition: {
      ease: "easeIn",
      duration: .5
    }
  }

  const draw = () => {
    const card = drawCard();
    setCurrentCard(card);
    setAnimation(animation);
    setTimeout(() => setAnimation({ scale: 1 }), 500)
    setTimeout(() => {
      //TODO: this timeout is a hack, should reconsider how properly change this
      state.hand.set(index, card);
    }, 2000)
  }

  const removeAndDraw = () => {
    setCurrentCard(null);
    draw();
  }


  return (
    // Return a Card component if there is a card in the slot, otherwise return an empty div
    // Wrapped in a motion.div to animate the card when it is drawn, this is also where we paint the player color.
    <motion.div id={`hand-${index}`} animate={currentAnimation} whileHover={{ scale: 1.2 }} style={{ backgroundColor: Socket.IO.color }} className={`flex justify-center h-full aspect-square hover:scale-125`}>
      {currentCard ? <Card name={currentCard.name} compass={currentCard.compass} imagePath={currentCard.imagePath} removeAndDraw={removeAndDraw} inPlay={false} slotIndex={index} size={size} /> : ''}
    </motion.div>
  )
}
