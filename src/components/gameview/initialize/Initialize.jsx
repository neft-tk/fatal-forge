// The initialize component will act as a pre-game lobby for players who have joined or created a particullar (socket) room.

// Players will join the initialize component from the assembly component and leave for the game component once both player indicate they are ready.

import React from 'react'
import Socket from '../../../utils/socket';

export default function Initialize(props) {

  return (
    <div>
      <h1>Game Id: {props.gameId}</h1>
      Initialize
    </div>
  )
}
