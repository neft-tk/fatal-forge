// The Gameview component contains all components related to gameplay.

// The general flow of the Gameview will be: assembly => initialize => game

import React, { useState } from 'react'
import Assembly from './assembly/Assembly'
import Initialize from './initialize/Initialize';
import Game from './game/Game'

export default function Gameview() {
  const [view, setView] = useState('assembly');
  const [gameId, setGameId] = useState();
  
  function renderView(){
    switch (view){
      case 'assembly':
        return <Assembly setView={setView} setGameId={setGameId}/>
      case 'initialize':
        return <Initialize gameId={gameId}/>
      case 'game':
        return <Game/>
    }
  }
  return (
    renderView()
  )
}
