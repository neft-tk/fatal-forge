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
    <div ref={dragRef} className='w-full h-full relative font-main-text-f text-xl'>
      <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mt-[-10px] left-[50%] top-[11%] text-center z-10 text-black font-bold'>{compass[0]}</h3>
      <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mt-[-10px] left-[14%] top-[48%] text-center z-10 text-black font-bold'>{compass[3]}</h3>
      <h3 className='absolute w-[20px] h-[20px] mr-[-10px] mt-[-10px] right-[13%] top-[48%] text-center z-10 text-black font-bold'>{compass[1]}</h3>
      <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mb-[-10px] left-[50%] bottom-[16%] text-center z-10 text-black font-bold'>{compass[2]}</h3>
      <img src={`${Static.serverUrl}/api/images/${imagePath}`} className='w-1/2 h-1/2 absolute left-[25%] top-[25%]'></img>
      <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face.png`} className='absolute' />
    </div>
  )
}
