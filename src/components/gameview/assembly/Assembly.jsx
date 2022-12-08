// The assembly component will handle players joining and creating rooms to play with others.

// Once a player has joined a room, they will be taken to that room, in the initialize component.

import React, { useState } from 'react'
import Socket from '../../../utils/socket';


function Assembly() {
  const [joinRoom, setJoinRoom] = useState("");
  const [createRoom, setCreateRoom] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Based on which button was clicked.
    switch (e.target.className) {
      case "join-room":
        Socket.Game.JoinGame(joinRoom);
        break;
      case "create-room":
        Socket.Game.CreateGame(createRoom);
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