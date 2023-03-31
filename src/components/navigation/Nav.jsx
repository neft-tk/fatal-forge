// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { GiCardPick, GiTabletopPlayers } from 'react-icons/gi'
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { GiIdCard } from 'react-icons/gi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Modal } from 'flowbite-react';
import NavBarIcon from './NavBarIcon';
import gllogo from '../../assets/png/gridlocke1.png';
import { MdOutlineLiveHelp } from 'react-icons/md'

export default function Nav({ view, setView, handleLogout }) {
  const [showModal, setShowModal] = useState(false);

  const onModalClick = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className="bg-black/25 flex justify-around items-center md:flex-col md:h-screen grow-0 shrink-0 p-2 gap-1">
      <Link to="/lobby">
        <img src={gllogo} alt="Gridlocke logo" className="h-[64px] w-auto" />
      </Link>
      <Link to="/gameview">
        <div className='relative text-4xl md:text-5xl navbar-icon group'>
          <GiTabletopPlayers className='text-neutral-200 absolute pointer-events-none z-10 scale-90' />
          <BsGrid3X3GapFill className='text-neutral-700 hover:scale-125 hover:text-sky-600' />
          <span className="navbar-tooltip group-hover:scale-100 text-xl">
            Play
          </span>
        </div>
      </Link>
      <Link to="/deckbuilder">
        <NavBarIcon icon={<GiCardPick className='navbar-icon' />} text="Deck Builder" />
      </Link>
      <Link to="/profile">
        <NavBarIcon icon={<GiIdCard className='navbar-icon' />} text="Profile" />
      </Link>
      <Link to="/friends">
        <NavBarIcon icon={<FaUserFriends className='navbar-icon' />} text="Friends" />
      </Link>
      <button onClick={onModalClick}>
        <NavBarIcon icon={<MdOutlineLiveHelp className='navbar-icon' />} text="How To Play" />{' '}
      </button>
      <button onClick={onLogoutClick}>
        <NavBarIcon icon={<RiLogoutBoxLine className='navbar-icon' />} text="Logout" />{' '}
      </button>
      <Modal show={showModal} size="xl" popup={true} onClose={onModalClose}>
        <Modal.Header className="bg-main-bg" />
        <Modal.Body className="bg-main-bg max-h-90 min-w-full">
          <div className="text-center text-sm md:text-base text-alt-text overflow-auto font-main-text-f">
            <br />
            <h3 className="text-xl font-display-text-f text-main-text">
              How to Play:
            </h3>
            <br />
            <p>
              In Gridlocke, your goal is to control the majority of the grid at
              the end of the game!
              <br />
              <br />
              Each player takes turn playing a card in an empty slot on the
              grid. After playing your card, your card will initiate a battle
              with any adjacent opposing cards!
              <br />
              <br />
              When a battle occurs, your card's stat will be compared to the
              adjacent opposing card's stat. For example, if there is a card
              north of the slot you just played your card, your card's north
              stat will be compared to the opposing card's south stat. If your
              card's value is higher, then you will capture the opposing card!
              <br />
              <br />
              The order of battle is left, right, top, bottom. Your card will do
              battle in each of these directions and perform a chain. What's
              that?
            </p>
            <br />
            <br />
            <h3 className="text-xl text-main-text font-display-text-f">
              Chaining Cards:
            </h3>
            <br />
            <br />
            <p>
              After capturing an opposing card, your card will perform a chain!
              This means that the card that you just captured will act just like
              playing a new card.
              <br />
              <br />
              The new card will now perform battle with it's neightbors, and
              this process will continue until the chain is stopped.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
