// The initialize component will act as a pre-game lobby for players who have joined or created a particullar (socket) room.

// Players will join the initialize component from the assembly component and leave for the game component once both player indicate they are ready.

import React, {useState} from 'react'
import Socket from '../../../utils/socket';

export default function Initialize(props) {
  // Use the DeckID as values for the options
  const [deckChoice, setDeckChoice] = useState("");
  // Assign colors to ids and set here?
  const [colorChoice, serColorChoice] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);

  const renderUsers = (users)=>{
    console.log('render', users)
    return(
      <div id='usersContainer'>
        <h2>Players:</h2>
            {users.map((x,i)=>{
              return (
              <div className='flex' key={i}>
              <h3 style={{color:x.color || 'white'}}>{x.userData.username}</h3>
              <h3>{x.isReady ? 'Ready' : 'Preparing'}</h3>
              </div>
            )

      })}
      </div>

    )
  }

  Socket.Game.OnPlayerUpdate((players)=>{
    setConnectedUsers(players);
    console.log('players', players)
  })

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    // TODO: Check that values are valid
    // TODO: Ping socket to indicate player is ready and present unready button.
    Socket.Game.SetReady();
  }

  return (
    <div>
      <h1>Game Id: {props.gameId}</h1>
      {/* TODO: Ping server for all sockets connected to this gameId and populate users. */}
      {renderUsers(connectedUsers)}
      <form action="">
        <label htmlFor="deckChoice">Pick Your Deck:</label>
        <select name="deck-choice" id="deckChoice" required onChange={e => console.log(e)}>
          {/*TODO: Populate with user's deck options */}
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <br />
        <label htmlFor="colorChoice">Pick Your Color</label>
        <select name="color-choice" id="colorChoice" required onChange={e => console.log(e)}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
        <br />
        <button type='submit' onClick={handleFormSubmit}>Ready</button>
      </form>
    </div>
  )
}