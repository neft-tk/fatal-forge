// The grid component functions as our gameboard.

// Cards will be placed on the grid via the gridslot component (where the actual data will be housed)

import React, { useState } from 'react'
import Socket from '../../../utils/socket';
import Gridslot from './Gridslot';

export default function Grid() {
  const [action, setAction] = useState();

  const slots = Array(9).fill(null);
  Socket.Game.OnPlacedCard((data)=>{
    const {card, index, changes} = data;

  })

  return (
    <div className='flex flex-wrap w-full'>
      {slots.map((x,i)=>{return <Gridslot key={i} index={i} action={action}/>})}
    </div>
  )
}