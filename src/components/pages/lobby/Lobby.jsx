// The Lobby component will house the bulk of Fatal Forge's social interaction.

// Chat, friends tab, add friend, etc.

import React from 'react'
import Chat from './Chat'
import gllogo from '../../../assets/png/gridlocke1.png'

export default function Lobby({ userId }) {
  
  return (
        <Chat userId={userId} />
  )
}
