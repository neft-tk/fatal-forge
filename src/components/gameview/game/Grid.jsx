// The grid component functions as our gameboard.

// Cards will be placed on the grid via the gridslot component (where the actual data will be housed)

import React from 'react'
import Gridslot from './Gridslot';

export default function Grid() {

  const slots = Array(9).fill(null);

  return (
    <div className='flex flex-wrap w-full'>
      {slots.map((x,i)=>{return <Gridslot key={i} index={i}/>})}
    </div>
  )
}