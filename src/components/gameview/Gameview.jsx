// The Gameview component contains all components related to gameplay.

// The general flow of the Gameview will be: assembly => initialize => game

import React, { useState } from 'react'
import Assembly from './Assembly'
import Initialize from './Initialize';
import Game from './game/Game'

export default function Gameview() {
  const [view, setView] = useState('assembly');
  const [gameId, setGameId] = useState();
  const [deck, setDeck] = useState();
  
  function renderView(){
    switch (view){
      case 'assembly':
        return <Assembly setView={setView} setGameId={setGameId}/>
      case 'initialize':
        return <Initialize setView={setView} gameId={gameId} setDeck={setDeck} />
      case 'game':
        return <Game deckId={deck}/>
    }
  }
  return (
    renderView()
  )
}
