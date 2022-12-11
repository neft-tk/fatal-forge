// The Gridslot component represents any individual tile on the Grid.

// The Gridslot component will either be contain a Card or be empty.

import React from 'react'

export default function Gridslot({index}) {
  return (
    <div className='flex justify-center items-center relative w-[30%] h-[200px] border'>
      <h1 className='absolute'>slot {index}</h1>
    </div>
  )
}
