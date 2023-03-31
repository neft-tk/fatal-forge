import React from 'react';
import Chat from './subviews/Chat';
import gllogo from '../../../assets/png/gridlocke1.png';

// The Lobby component will house the bulk of Fatal Forge's social interaction.
// Chat, friends tab, add friend, etc.

export default function Lobby({ userId }) {
  return (
    <div className="flex flex-col items-center h-full w-full">
      {/* Hero */}
      <img src={gllogo} alt="Gridlocke logo" className="h-[25vh]" />
      {/* Bio */}
      <div className='m-4 p-4 max-w-md border rounded-lg bg-neutral-900 border-neutral-800 shadow-md shadow-black'>
        <p className="font-main-text-f text-center md:text-2xl">
          <span className="font-alt-text-f">
            Welcome to{' '}
            <span className="ml-2 md:text-3xl font-bold text-highlight-blue">
              GridLocke
            </span>
            <span className="md:text-3xl font-bold mx-2"><br /></span>The deck-building
            tactical card game!
          </span>
          <br />
          <br />
          Fulfill your role as a destined decksmith and wield magically infused
          cards to battle with friends online!
          <br />
          <br />
          Build your deck with diverse, unique, and fun strategies in order to
          take majority control of the grid!
          <br />
          <br />
          Meet on a battlefield of 3x3, 4x4, or 5x5 grid slots to test different
          aspects of your aptitude for battle.
        </p>
      </div>
      {/* Chat + Active Players */}
      {/* <div className='h-screen'>
        <Chat userId={userId} />
      </div> */}
      {/* Chat */}
      {/* Future Updates */}
      {/* <div className='h-1/3'>
          Future Updates:
        </div> */}
    </div>
  );
}
