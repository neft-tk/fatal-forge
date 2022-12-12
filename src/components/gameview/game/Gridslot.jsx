// The Gridslot component represents any individual tile on the Grid.

// The Gridslot component will either be contain a Card or be empty.

import React, {useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import Socket from '../../../utils/socket'
import {motion} from 'framer-motion'
import Card from '../../Card';
import state from '../../..//utils/staticHelper'

export default function Gridslot({index, action, size}) {

    const [card, setCard] = useState();
    const [faction, setFaction] = useState('transparent');

    const [currentAnimation, setCurrentAnimation] = useState({scale:1});
     //basket and drop ref for drag and drop detection
     const [basket, setBasket] = useState([])

     useEffect(()=>{
      if (!action){
        return;
      }

      if (action.type=='place'){
        const {card} = action.data;
        if (action.data.index != index){
          return;
        }
        console.log(action);
        setCard({
          name:card.name,
          compass:card.compass,
          imagePath:card.imagePath
        })
        setFaction(card.faction);
        setCurrentAnimation({
          scale: [0,1],
          transition:{
            ease:"easeIn", 
            duration:.5
          }
        })
        setTimeout(() => {
          setCurrentAnimation({scale:1})
        }, 500);
      }else if (action.type = 'flip'){
        const change = action.change;
        if (change.index != index){
          return;
        }
        console.log(change);
        setCurrentAnimation({
          scale: [1,0,1],
          backgroundColor: [faction, change.toFaction],
          transition:{
            ease:"easeIn", 
            duration:.5
          }
        })
        setFaction(change.toFaction);
        setTimeout(()=>{
          setCurrentAnimation({scale:1, backgroundColor:change.toFaction})
        },500)
      }
     },[action])

     const [{ isOver }, dropRef] = useDrop(
         {
         accept: 'card', //accept a drop type of 'card' if this is a 'gridSlot'
         drop: (item) => setBasket((basket) => {
                                 const data = {
                                     gridIndex:index,
                                     meta:state.hand.get(item.index)
                                 }
                                 Socket.Game.PlaceCard(data) // emit the card placement to the server with the data of this slot index and the item (card meta)
                                 return !basket.includes(item) ? [...basket, item] : basket
                             }),
         collect: (monitor) => ({
             isOver: monitor.isOver() && card == undefined // allow collection if hovering and no card exists in this slot
         }
         
         ),
         canDrop: ()=> card == undefined // allow drop if this slot doesn't already have a card
     })

  return (
    <motion.div ref={dropRef} animate={currentAnimation} className={`flex justify-center items-center relative w-1/${size} aspect-square border`} style={{backgroundColor:isOver ? 'yellow' : faction}}>
      {card ? <Card inPlay={true} name={card.name} compass={card.compass} imagePath={card.imagePath}/> : ''}
    </motion.div>
  )
}
