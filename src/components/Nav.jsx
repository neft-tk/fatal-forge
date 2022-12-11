// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import HomeIcon from '.././assets/svg/HomeIcon'
import NavBarIcon from './NavBarIcon'

export default function Nav(props) {
  return (
    <div className='p-4 w-40 flex flex-col bg-zinc-900'>
        {/* <Link to="/gameview">Play</Link>
        <Link to="/deckbuilder">Decks</Link>
        <Link to="/lobby">Friends</Link> */}
        <Link to="/lobby"><NavBarIcon icon={<FaHome size="40" />} text='Home' /></Link>
        <Link to="/gameview"><NavBarIcon icon={<FaHome size="40" />} text='Game'/></Link>
        <Link to="/deckbuilder"><NavBarIcon icon={<FaHome size="40" />} text='Deck Builder'/></Link>
        <NavBarIcon icon={<FaHome size="40" />} text='Profile'/>
        <NavBarIcon icon={<FaHome size="40" />} text='Friends'/>
        {/* <NavBarIcon icon={<FaHome size="40" />} text='Stats'/> */}
        {/* <NavBarIcon icon={<FaHome size="40" />} text='Channels'/> */}
        {/* <NavBarIcon icon={<FaHome size="40" />} text='Settings'/> */}
    </div>
  )
}
