// The initialize component will act as a pre-game lobby for players who have joined or created a particullar (socket) room.

// Players will join the initialize component from the assembly component and leave for the game component once both player indicate they are ready.

import React, { useEffect, useState } from 'react'
import Socket from '../../utils/socket';
import { CirclePicker } from 'react-color';

export default function Initialize(props) {
  // Use the DeckID as values for the options
  const [deckChoice, setDeckChoice] = useState();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    Socket.IO.off('game');
    Socket.Game.OnPlayerUpdate((players) => {
      if (players.filter(x => x.isReady).length > 1) {
        props.setView('game');
      }
      setConnectedUsers(players);
    })
    syncUp();
  }, [])

  async function syncUp() {
    const resp = await fetch(`http://localhost:3001/api/socket/games/${props.gameId}`);
    const data = await resp.json();
    setConnectedUsers(data.players);

    const userId = Socket.IO.userInfo.id;
    const r = await fetch(`http://localhost:3001/api/users/${userId}`);
    const d = await r.json();

    const deckMap = d.Decks.map(x => { return { name: x.deckName, id: x.id } });
    setDecks(deckMap);
    setDeckChoice(deckMap[0].id)
    props.setDeck(deckMap[0].id)
  }

  const renderUsers = (users) => {
    return (
      <div id='usersContainer' className='flex flex-col justify-evenly h-4/5 border-4 rounded-lg p-10'>
        {users.map((x, i) => {
          return (
            <div className='text-center border rounded-lg h-1/3' key={i}>
              <div className='flex justify-evenly items-center h-3/5'>
                <h3 className='font-semibold'>{x.userData.username}</h3>
                <div className='border p-1 rounded-full w-1/5 h-1/5' style={{ backgroundColor: x.color }}></div>
              </div>
              <h3 className='h-2/5 font-semibold'>{x.isReady ? 'Ready' : 'Preparing'}</h3>
            </div>
          )

        })}
      </div>
    )
  }



  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // TODO: Check that values are valid
    // this is ensuring users pick different colors
    const set = new Set(connectedUsers.map(x => x.color));
    if (set.size != connectedUsers.length) {
      alert('Someone already has that color! Please choose a different one.');
    } else {
      Socket.Game.SetReady();
    }

  }

  return (
    <div className='text-center h-full flex flex-col justify-evenly align-center'>

      {/* Options + Players Div */}
      <div className='flex justify-evenly h-3/5'>

        {/* Game Options Form */}
        <form action="" className='flex flex-col justify-between items-center w-2/5'>

          {/* Deck Choice */}
          <div className='flex flex-col justify-evenly items-center'>
            <label htmlFor="deckChoice" className='m-5 font-bold'>Choose Your Deck</label>
            <select name="deck-choice" id="deckChoice" className='bg-black' required onChange={e => {
              props.setDeck(e.target.value); setDeckChoice(e.target.value); console.log(e.target.value)
            }}>
              {decks.map((x, i) => { return (<option value={x.id} key={i} >{x.name}</option>) })}
            </select>
          </div>

          {/* Color Choice*/}
          <div className='flex flex-col justify-evenly items-center'>
            <label className='m-5 font-bold'>Choose Your Color</label>
            <CirclePicker className='flex justify-evenly items-center w-full' onChange={(c, e) => { Socket.Game.PickColor(c.hex); Socket.IO.color = c.hex }} />
          </div>
          {/* Ready */}
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/5' type='submit' onClick={handleFormSubmit}>Ready</button>
        </form>

        {/* All Players */}
        <div className='w-2/5 flex flex-col justify-between m-5'>
          <h2 className='font-semibold text-3xl'>Players</h2>
          {renderUsers(connectedUsers)}
        </div>

      </div>
      {/* Game ID Div */}
      <div className='h-1/5 flex flex-col justify-around items-center '>
        <h1 className='text-gray-300 text-4xl border rounded-md w-1/5 p-3'>Room ID: <span className='font-bold text-white'>{props.gameId}</span></h1>
      </div>
    </div>
  )
}