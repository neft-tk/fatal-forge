import React, { useEffect, useState } from 'react'
import Assembly from './Assembly'
import Initialize from './Initialize';
import Game from './game/Game'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider, TouchTransition, MouseTransition, Preview } from 'react-dnd-multi-backend'
import Socket from '../../utils/socket';

// The Gameview component contains all components related to gameplay.
// The general flow of the Gameview will be: assembly => initialize => game

export const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
}

export default function Gameview() {
  const [view, setView] = useState('assembly');
  const [gameId, setGameId] = useState();
  const [deck, setDeck] = useState();
  const [size, setSize] = useState(3);

  useEffect(() => {
    return () => {
      Socket.Game.Leave();
    }
  }, [])

  const generatePreview = ({ itemType, item, style }) => {
    if (itemType == 'card' && Socket.IO.preview) {
      return <div style={{
        position: 'fixed',
        top: Socket.IO.position.y - 50, left: Socket.IO.position.x - 50,
        backgroundColor: 'yellow', pointerEvents: 'none'
      }}>{Socket.IO.preview}</div>
    } else {
      return null
    }
  }

  function renderView() {
    switch (view) {
      case 'assembly':
        return <Assembly setView={setView} setGameId={setGameId} />
      case 'initialize':
        return <Initialize setView={setView} gameId={gameId} setDeck={setDeck} setSize={setSize} />
      case 'game':
        return (
          <DndProvider options={HTML5toTouch}>
            <Preview generator={generatePreview} />
            <Game deckId={deck} size={size} gameId={gameId} setView={setView} />
          </DndProvider>
        )
      default: return <div>Something went wrong</div>
    }
  }
  return (
    renderView()
  )
}
