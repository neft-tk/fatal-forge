// The assembly component will handle players joining and creating rooms to play with others.

// Once a player has joined a room, they will be taken to that room, in the initialize component.

import React, { useState } from 'react'
import Socket from '../../../utils/socket';


function Assembly({setView, setGameId}) {
  const [joinRoom, setJoinRoom] = useState("");
  const [createRoom, setCreateRoom] = useState("");

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    // Based on which button was clicked.
    switch (e.target.className) {
      case "join-room":{
          // Going to hit our api for a response to see if that room exists
          const resp = await fetch(`http://localhost:3001/api/socket/game/${joinRoom}`);
          const data = await resp.json();

          // The return data for that route is currently just an object with a single key 'exists' which will be a boolean
          if (data.exists){
            // Join the game room on the server with socket, and set the states in the gameview to render the initialize component
            Socket.Game.JoinGame(joinRoom);
            setGameId(joinRoom);
            setView('initialize');
          }else{
            //todo: change the alert to a modal when we get deeper in styling
            alert('Room with that name already exists. Try another')
        }
      }
      break;

      case "create-room":{
        // Going to hit our api for a response to see if that room already exists
        const resp = await fetch(`http://localhost:3001/api/socket/game/${createRoom}`);
        const data = await resp.json();

        // The return data for that route is currently just an object with a single key 'exists' which will be a boolean
        if (data.exists){
          //todo: change the alert to a modal when we get deeper in styling
          alert('Room with that name already exists. Try another')
        }else{ 
          // Create the game room on the server with socket, and set the states in the gameview to render the initialize component
          Socket.Game.CreateGame(createRoom);
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
    <div>
      <form action="">
        <label htmlFor="joinRoomInput">Room ID: </label>
        <input type="text" id='joinRoomInput' placeholder='Room ID' value={joinRoom} onChange={e => setJoinRoom(e.target.value)}/>
        <button className='join-room' onClick={handleFormSubmit}>Join Room</button>
        <br />
        <label htmlFor="createRoomInput">New Room ID: </label>
        <input type='text' id='createRoomInput' placeholder="New Room ID" value={createRoom} onChange={e => setCreateRoom(e.target.value)}/>
        <button className='create-room' onClick={handleFormSubmit}>Create Room</button>
      </form>
    </div>
  )
}

export default Assembly;