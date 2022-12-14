// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUserAlt, FaUserFriends } from 'react-icons/fa';
import { BsFillChatDotsFill, BsQuestionLg } from 'react-icons/bs';
import { GiCardAceSpades } from 'react-icons/gi';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { Modal } from 'flowbite-react';
import HomeIcon from '.././assets/svg/homeIcon.svg';
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
    <div className="flex h-[80px] w-full justify-around md:flex-col md:w-[80px] md:h-full bg-main-bg grow-0 shrink-0">
      <Link to="/lobby">
        <img src={gllogo} alt="Gridlocke logo" className='h-full'/>
        {/* <NavBarIcon icon={<BsFillChatDotsFill size="40" />} text="Chat" /> */}
      </Link>
      <Link to="/gameview">
        <NavBarIcon classes={''} icon={<FaGamepad size="40" />} text="Game" />
      </Link>
      <Link to="/deckbuilder">
        <NavBarIcon icon={<GiCardAceSpades size="40" />} text="Deck Builder" />
      </Link>
      <Link to="/profile">
        <NavBarIcon icon={<FaUserAlt size="40" />} text="Profile" />
      </Link>
      <Link to="/friends">
        <NavBarIcon icon={<FaUserFriends size="40" />} text="Friends" />
      </Link>
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Stats'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Channels'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Settings'/> */}
      <button onClick={onModalClick}>
        <NavBarIcon icon={<BsQuestionLg size="40" />} text="How To Play" />{' '}
      </button>
      <button onClick={onLogoutClick}>
        <NavBarIcon icon={<RiLogoutBoxFill size="40" />} text="Logout" />{' '}
      </button>
      <>
        <Modal show={showModal} size="xl" popup={true} onClose={onModalClose}>
          <Modal.Header className="bg-slate-600">
            <Modal.Body className="bg-slate-500 max-h-90 min-w-full overflow-auto">
              <div className='text-center text-sm'>
                <br />
                <h3 className="text-xl text-main-orange">
                  How to Play:
                </h3>
                <br />
                <p>
                  In Gridlocke, your goal is to control the majority of the grid
                  at the end of the game!
                  <br />
                  Each player takes turn playing a card in an empty slot on the
                  grid. After playing your card, your card will initiate a
                  battle with any adjacent opposing cards!
                  <br />
                  When a battle occurs, your card's stat will be compared to the
                  adjacent opposing card's stat. For example, if there is a card north of
                  the slot you just played your card, your card's north stat
                  will be compared to the opposing card's south stat. If your
                  card's value is higher, then you will capture the opposing
                  card!
                  <br />
                  The order of battle is left, right, top, bottom. Your card will do battle in each of these directions and perform a chain. What's that?
                </p>
                <br />
                <h3 className="text-md text-main-orange">Chaining Cards:</h3>
                <br />
                <p>
                  After capturing an opposing card, your card will perform a chain! This means that the card that you just captured will act just like playing a new card.
                  <br />
                  The new card will now perform battle with it's neightbors, and this process will continue until the chain is stopped.
                </p>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </>
    </div>
  );
}
