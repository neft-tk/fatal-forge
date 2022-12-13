// The Gameview component contains all components related to gameplay.

// The general flow of the Gameview will be: assembly => initialize => game

import React, { useState } from 'react'
import Assembly from './Assembly'
import Initialize from './Initialize';
import Game from './game/Game'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Gameview() {
  const [view, setView] = useState('assembly');
  const [gameId, setGameId] = useState();
  const [deck, setDeck] = useState();
  const [size, setSize] = useState(3);

  function renderView() {
    switch (view) {
      case 'assembly':
        return <Assembly setView={setView} setGameId={setGameId} />
      case 'initialize':
        return <Initialize setView={setView} gameId={gameId} setDeck={setDeck} setSize={setSize} />
      case 'game':
        return (
          <div className='max-h-screen h-screen p-3'>
            <DndProvider backend={HTML5Backend}>
              <Game deckId={deck} size={size} />
            </DndProvider>
          </div>

        )
    }
  }
  return (
    renderView()
  )
}
