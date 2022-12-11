// The Card component represents and individual card with its stat values pulled from the backend.

import React from 'react'

export default function Card({name, compass}) {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center border'>
      <h3>{name}</h3>
      <div>
        <h3>{compass[0]}</h3>
        <h3>{compass[3]} - {compass[1]}</h3>
        <h3>{compass[2]}</h3>
      </div>

    </div>
  )
}
