// The Card component represents and individual card with its stat values pulled from the backend.

import React from 'react'
import {useDrag} from 'react-dnd'
import Socket from '../utils/socket';

export default function Card({name, compass, imagePath,inPlay, removeAndDraw}) {
  const [{isDragging}, dragRef] = useDrag(
    () => ({
      type: 'card',
      item:{name,compass, imagePath},
      collect: (monitor) => ({
        
        isDragging: !!monitor.isDragging()
      }
      ),
      end:(item, monitor) =>{
        if (item && monitor.getDropResult()){
            removeAndDraw();
        }
      },
      canDrag:()=>{return !inPlay && Socket.IO.myTurn}
    })
  )

  return (
    <div ref={dragRef} className='w-full h-full flex flex-col justify-center items-center border relative'>
      <h3>{name}</h3>
      <img src={`http://localhost:3001/api/images/${imagePath}`} className='w-1/2 h-1/2 absolute'></img>
      <div className='relative bg-black bg-opacity-50 flex flex-col justify-center items-center'>
        <h3>{compass[0]}</h3>
        <h3>{compass[3]} - {compass[1]}</h3>
        <h3>{compass[2]}</h3>
      </div>

    </div>
  )
}
