// The Lobby component will house the bulk of Fatal Forge's social interaction.

// Chat, friends tab, add friend, etc.

import React from 'react'
import Chat from './Chat'
import gllogo from '../../../assets/png/gridlocke1.png'
export default function Lobby({ userId }) {

  return (
    <div className='flex flex-col items-center h-screen'>
      {/* Hero */}
      <img src={gllogo} alt="Gridlocke logo" className='w-1/4 mx-auto my-0' />
      {/* Bio */}
      <p className='h-1/4 w-full mx-auto my-0 font-main-text-f text-center'>
        <span className='font-alt-text-f'>Welcome to <span className=' text-3xl font-bold text-highlight-orange'>GridLocke</span>, the deck-building tactical card game!</span>
        <br />
        <br />
        Fulfill your role as a destined decksmith and wield magically infused cards to battle with friends online!
        <br />
        <br />
        Build your deck with diverse, unique, and fun strategies in order to take majority control of the grid!
        <br />
        <br />
        Meet on a battlefield of 3x3, 4x4, or 5x5 grid slots to test different aspects of your aptitude for battle.
      </p>
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
  )
}
