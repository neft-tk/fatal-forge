// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUserAlt, FaUserFriends } from 'react-icons/fa';
import { BsFillChatDotsFill, BsQuestionLg } from 'react-icons/bs';
import { GiCardAceSpades } from 'react-icons/gi';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { Modal } from 'flowbite-react';
import NavBarIcon from './NavBarIcon';
import gllogo from '../assets/png/gridlocke1.png';

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
    <div className="navbar-main">
      <Link to="/lobby">
        <img src={gllogo} alt="Gridlocke logo" className="h-[80px] w-auto" />
        {/* <NavBarIcon icon={<BsFillChatDotsFill size="40" />} text="Chat" /> */}
      </Link>
      <Link to="/gameview">
        <NavBarIcon icon={<FaGamepad className='navbar-icon' />} text="Game" />
      </Link>
      <Link to="/deckbuilder">
        <NavBarIcon icon={<GiCardAceSpades className='navbar-icon' />} text="Deck Builder" />
      </Link>
      <Link to="/profile">
        <NavBarIcon icon={<FaUserAlt className='navbar-icon' />} text="Profile" />
      </Link>
      <Link to="/friends">
        <NavBarIcon icon={<FaUserFriends className='navbar-icon' />} text="Friends" />
      </Link>
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Stats'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Channels'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Settings'/> */}
      <button onClick={onModalClick}>
        <NavBarIcon icon={<BsQuestionLg className='navbar-icon' />} text="How To Play" />{' '}
      </button>
      <button onClick={onLogoutClick}>
        <NavBarIcon icon={<RiLogoutBoxFill className='navbar-icon' />} text="Logout" />{' '}
      </button>
      <Modal show={showModal} size="xl" popup={true} onClose={onModalClose}>
        <Modal.Header className="bg-main-bg" />
        <Modal.Body className="bg-main-bg max-h-90 min-w-full">
          <div className="text-center text-sm text-alt-text overflow-auto font-main-text-f">
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
