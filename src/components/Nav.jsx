// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav(props) {
  return (
    <div className='nav-container'>
        <Link to="/gameview">Play</Link>
        <Link to="/deckbuilder">Decks</Link>
        <Link to="/lobby">Friends</Link>
    </div>
  )
}
