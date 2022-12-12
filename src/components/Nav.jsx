// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUserFriends } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { GiCardAceSpades } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import HomeIcon from '.././assets/svg/homeIcon.svg';
import NavBarIcon from './NavBarIcon';

export default function Nav(props) {
  return (
    <div className="p-2 w-28 flex flex-col bg-alt-bg justify-evenly">
      {/* <Link to="/gameview">Play</Link>
        <Link to="/deckbuilder">Decks</Link>
        <Link to="/lobby">Friends</Link> */}
      <Link to="/gameview">
        <NavBarIcon icon={<FaGamepad size="40" />} text="Game" />
      </Link>
      <Link to="/lobby">
        <NavBarIcon icon={<BsFillChatDotsFill size="40" />} text="Chat" />
      </Link>
      <Link to="/deckbuilder">
        <NavBarIcon icon={<GiCardAceSpades size="40" />} text="Deck Builder" />
      </Link>
      <Link to="/profile">
        <NavBarIcon icon={<CgProfile size="40" />} text="Profile" />
      </Link>
      <Link to="/friends">
        <NavBarIcon icon={<FaUserFriends size="40" />} text="Friends" />
      </Link>
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Stats'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Channels'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Settings'/> */}
    </div>
  );
}
