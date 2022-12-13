// The Nav component will house basic navigation links between the main sections of our game.

// The Nav will contain: Lobby (lobby component), Deckbuilding (deckbuilding component), Play (assembly component)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUserAlt, FaUserFriends } from 'react-icons/fa';
import { BsFillChatDotsFill, BsQuestionLg } from 'react-icons/bs';
import { GiCardAceSpades } from 'react-icons/gi';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import HomeIcon from '.././assets/svg/homeIcon.svg';
import NavBarIcon from './NavBarIcon';

export default function Nav(props) {
  const [showModal, setShowModal] = useState(false);

  const onModalClick = (e) => {
    setShowModal(true);
  };

  const onModalClose = (e) => {
    setShowModal(false);
  };

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
        <NavBarIcon icon={<FaUserAlt size="40" />} text="Profile" />
      </Link>
      <Link to="/friends">
        <NavBarIcon icon={<FaUserFriends size="40" />} text="Friends" />
      </Link>
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Stats'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Channels'/> */}
      {/* <NavBarIcon icon={<FaHome size="40" />} text='Settings'/> */}
      <span onClick={onModalClick}><NavBarIcon icon={<BsQuestionLg size="40" />} text="How To Play" /> </span>
      <>
        <Modal show={showModal} size="xl" popup={true} onClose={onModalClose}>
          <Modal.Header className="bg-slate-600">
            <Modal.Body className="bg-slate-500 max-h-90 min-w-full overflow-auto">
              <div>
                <h3>How to Play:</h3>
                <p>
                  In Gridlocke, your goal is to control the majority of the grid at the end of the game!
                  <br />
                  Each player takes turn playing a card in an empty slot on the grid. After playing your card, your card will initiate a battle with any adjacent opposing cards!
                  <br />
                  When a battle occurs, your card's stat will be compared to the adjacent opposing card's stat. So if there is a card north of the slot you just played your card, your card's north stat will be compared to the opposing card's lower stat. If your card's value is higher, then you will capture the opposing card!
                  <br />
                  Keep in mind that the order of battle is left, right, top, then bottom! Your card will do battle in each of these directions and perform a chain.
                  </p>
                <h3>Chaining Cards:</h3>
                <br />
                <p>
                After capturing an opposing card, your card will perform a chain! This means that the card that you just captured will act just like playing a new card.
                <br />
                The new card will perform battle just like playing a regular card, and this process will continue until the card loses.
                </p>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>

      </>
    </div>
  );
}
