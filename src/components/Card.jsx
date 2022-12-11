// The Card component represents and individual card with its stat values pulled from the backend.

import React from 'react'
import {useDrag} from 'react-dnd'

export default function Card({name, compass, inPlay, removeAndDraw}) {
  const [{isDragging}, dragRef] = useDrag(
    () => ({
      type: 'card',
      item:{name,compass},
      collect: (monitor) => ({
        
        isDragging: monitor.isDragging()
      }
      ),
      end:(item, monitor) =>{
        if (item && monitor.getDropResult()){
            removeAndDraw();
        }
      },
      canDrag:()=>{return !inPlay}
    })
  )

  return (
    <div ref={dragRef} className='w-full h-full m-0 flex flex-col justify-center items-center border'>
      <h3>{name}</h3>
      <div>
        <h3>{compass[0]}</h3>
        <h3>{compass[3]} - {compass[1]}</h3>
        <h3>{compass[2]}</h3>
      </div>

    </div>
  )
}
