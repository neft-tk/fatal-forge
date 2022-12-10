// The initialize component will act as a pre-game lobby for players who have joined or created a particullar (socket) room.

// Players will join the initialize component from the assembly component and leave for the game component once both player indicate they are ready.

import React, {useEffect, useState} from 'react'
import Socket from '../../../utils/socket';
import {CirclePicker} from 'react-color';

export default function Initialize(props) {
  // Use the DeckID as values for the options
  const [deckChoice, setDeckChoice] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(async ()=>{
    const resp = await fetch(`http://localhost:3001/api/socket/game/${props.gameId}`);
    const data = await resp.json();
    setConnectedUsers(data.players);
  }, [])

  const renderUsers = (users)=>{
    console.log('render', users)
    return(
      <div id='usersContainer'>
        <h2>Players:</h2>
            {users.map((x,i)=>{
              return (
              <div className='flex items-center' key={i}>
              <h3>{x.userData.username}</h3>
              <h3 className='border p-1' style={{backgroundColor: x.color}}>Color</h3>
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
    
    // this is ensuring users pick different colors
    const set = new Set(connectedUsers.map(x=>x.color));
    if (set.size != connectedUsers.length){
      alert('Must pick a unique color');
    }else{
      Socket.Game.SetReady();
    }
    
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
        <label> Pick Your Color:</label>
        <CirclePicker className='border'  onChange={(c,e)=>{Socket.Game.PickColor(c.hex)}}/>
        <br/>
        <button type='submit' onClick={handleFormSubmit}>Ready</button>
      </form>
    </div>
  )
}