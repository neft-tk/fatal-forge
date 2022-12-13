// The Card component represents and individual card with its stat values pulled from the backend.

import React from 'react'
import { useDrag } from 'react-dnd'
import Socket from '../utils/socket';
import Static from '../utils/staticHelper'

export default function Card({ name, compass, imagePath, inPlay, removeAndDraw, slotIndex }) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item: { index: slotIndex },
      collect: (monitor) => ({

        isDragging: !!monitor.isDragging()
      }
      ),
      end: (item, monitor) => {
        if (item && monitor.getDropResult()) {
          removeAndDraw();
        }
      },
      canDrag: () => { return !inPlay && Socket.IO.myTurn }
    })
  )

  return (
    <div ref={dragRef} className='w-full h-full flex flex-col justify-center items-center relative font-main-text-f'>
      <h3>{name}</h3>
      <h3 className='absolute top-[3%] z-10 text-black font-bold'>{compass[0]}</h3>
      <h3 className='absolute left-[10%] z-10 text-black font-bold'>{compass[3]}</h3>
      <h3 className='absolute right-[10%] z-10 text-black font-bold'>{compass[1]}</h3>
      <h3 className='absolute bottom-[4%] z-10 text-black font-bold'>{compass[2]}</h3>
      <img src={`${Static.serverUrl}/api/images/${imagePath}`} className='w-1/2 h-1/2 absolute'></img>
      <img src={`${Static.serverUrl}/api/images/cardsprite/face.png`} className='absolute' />
    </div>
  )
}
