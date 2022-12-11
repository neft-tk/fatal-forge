// The Gridslot component represents any individual tile on the Grid.

// The Gridslot component will either be contain a Card or be empty.

import React, {useState} from 'react'
import { useDrop } from 'react-dnd'
import Socket from '../../../utils/socket'

export default function Gridslot({index, card}) {
     //basket and drop ref for drag and drop detection
     const [basket, setBasket] = useState([])

     const [{ isOver }, dropRef] = useDrop(
         {
         accept: 'card', //accept a drop type of 'card' if this is a 'gridSlot'
         drop: (item) => setBasket((basket) => {
                                 const data = {
                                     gridIndex:index,
                                     meta:item
                                 }
                                 //todo: -> socket.Game.PlaceCard(data) // emit the card placement to the server with the data of this slot index and the item (card meta)
                                 return !basket.includes(item) ? [...basket, item] : basket
                             }),
         collect: (monitor) => ({
             isOver: monitor.isOver() && card == undefined // allow collection if hovering and no card exists in this slot
         }
         
         ),
         canDrop: ()=> card == undefined // allow drop if this slot doesn't already have a card
     })

  return (
    <div ref={dropRef} className='flex justify-center items-center relative w-[30%] h-[200px] border' style={{backgroundColor:isOver ? 'yellow' : 'transparent'}}>
      <h1 className='absolute'>slot {index}</h1>
    </div>
  )
}
