import React from 'react'
// Drag and drop package
import { useDrag } from 'react-dnd'
// Utilities
import Socket from '../../../utils/socket';
import Static from '../../../utils/staticHelper'

// The Card component represents and individual card with its stat values pulled from the backend.

export default function Card({ name, compass, imagePath, inPlay, removeAndDraw, slotIndex, size }) {

  const generatePreview = () => {
    if (size) {
      return (
        // TODO: We are being inconsistent with how we are creating the card elements in different places, see DeckEditView
        <div className='fixed font-tile-text-f text-xl' style={{ width: size.x, height: size.y }}>
          {/* Top Number*/}
          <h3 className='tile-top'>{compass[0]}</h3>
          {/* Left Number */}
          <h3 className='tile-left'>{compass[3]}</h3>
          {/* Right Number */}
          <h3 className='tile-right'>{compass[1]}</h3>
          {/* Bottom Number */}
          <h3 className='tile-left'>{compass[2]}</h3>
          {/* Art */}
          <img src={`${Static.serverUrl}/api/images/${imagePath}`} className='tile-art' alt='Visual representation of the card in play.'></img>
          {/* Card Frame */}
          <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face-2.svg`} className='absolute w-full' alt='Card face.'/>
        </div>
      )
    }
    return null;
  }

  function collectFunc(monitor) {
    Socket.IO.position = monitor.getClientOffset();
    Socket.IO.preview = generatePreview();
    return {
      isDragging: !!monitor.isDragging()
    }
  }

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item: { index: slotIndex },
      collect: collectFunc,
      end: (item, monitor) => {
        if (item && monitor.getDropResult()) {
          removeAndDraw();
        }
      },
      canDrag: () => { return !inPlay && Socket.IO.myTurn }
    })
  )

  return (
    <div ref={dragRef} className='w-full h-full relative font-tile-text-f text-xl'>
      {/* Top Number */}
      <h3 className='tile-top'>{compass[0]}</h3>
      {/* Left Number */}
      <h3 className='tile-left'>{compass[3]}</h3>
      {/* Right Number */}
      <h3 className='tile-right'>{compass[1]}</h3>
      {/* Bottom Number */}
      <h3 className='tile-bottom'>{compass[2]}</h3>
      {/* Art */}
      <img src={`${Static.serverUrl}/api/images/${imagePath}`} className='tile-art' alt='Visual representation of the card in play.'></img>
      {/* Card Frame */}
      <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face-2.svg`} className='absolute w-full' alt='Card face.' />
    </div>
  )
}
