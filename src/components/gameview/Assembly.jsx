// The assembly component will handle players joining and creating rooms to play with others.

// Once a player has joined a room, they will be taken to that room, in the initialize component.

import React, { useEffect, useState } from 'react'
import Socket from '../../utils/socket';


function Assembly({ setView, setGameId }) {
  const [joinRoom, setJoinRoom] = useState("");
  const [createRoom, setCreateRoom] = useState("");
  const [gridSize, setGridSize] = useState(3);

  useEffect(() => {
    Socket.IO.off('game');
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Based on which button was clicked.
    switch (e.target.id) {
      case "join-room": {
        // Going to hit our api for a response to see if that room exists
        const resp = await fetch(`http://localhost:3001/api/sockets/games/${joinRoom}`);

        if (resp.ok) {
          const data = await resp.json();

          // Make sure the room isn't full
          if (data.players.length < 2) {
            // Join the game room on the server with socket, and set the states in the gameview to render the initialize component
            Socket.Game.JoinGame(joinRoom);
            setGameId(joinRoom);
            setView('initialize');
          } else {
            //todo: change the alert to a modal when we get deeper in styling
            alert('That room is full.')
          }
        } else {
          alert(`That room doesn't exist`);
        }

      }
        break;

      case "create-room": {
        // Going to hit our api for a response to see if that room already exists
        const resp = await fetch(`http://localhost:3001/api/sockets/games/${createRoom}`);

        // if the response is ok then that room already exists
        if (resp.ok) {
          //todo: change the alert to a modal when we get deeper in styling
          alert('Room with that name already exists. Try another')
        } else {
          // Create the game room on the server with socket, and set the states in the gameview to render the initialize component
          Socket.Game.CreateGame(createRoom, gridSize);
          setGameId(createRoom);
          setView('initialize')
        }
      }
        break;
    }
    setCreateRoom("")
    setJoinRoom("")
  }

  return (
    <div className='flex flex-col h-full items-center align-middle justify-evenly'>
      <h3 className='text-4xl font-bold'>Create or Join a room to play!</h3>
      <form action="" className='h-4/5 flex flex-col justify-evenly items-center'>
        <div className='flex flex-col h-1/3 items-center justify-evenly'>
          <label htmlFor="joinRoomInput" className='text-2xl font-semibold'>Join</label>
          <input type="text" id='joinRoomInput' placeholder='Room ID' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={joinRoom} onChange={e => setJoinRoom(e.target.value)} />
          <button id='join-room' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleFormSubmit}>Join Room</button>
        </div>
        <div className='flex flex-col h-1/3 items-center justify-evenly'>
          <label htmlFor="createRoomInput" className='text-2xl font-semibold'>Create</label>
          <input type='text' id='createRoomInput' placeholder="New Room ID" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={createRoom} onChange={e => setCreateRoom(e.target.value)} />
          <select defaultValue={3} onChange={(e)=>{setGridSize(e.target.value)}}>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
          </select>
          <button id='create-room' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleFormSubmit}>Create Room</button>
        </div>
      </form>
    </div>
  )
}

export default Assembly;