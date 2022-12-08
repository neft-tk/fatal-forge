import React, { useState } from 'react'

// The assembly component will handle players joining and creating rooms to play with others.

// Once a player has joined a room, they will be taken to that room, in the initialize component.

function Assembly() {
  const [joinRoom, setJoinRoom] = useState("");
  const [createRoom, setCreateRoom] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // We will want to emit the room that this player wants to join/create
    console.log(e.target)
    setCreateRoom("")
    setJoinRoom("")
  }

  return (
    <div>
      <form action="">
        <label htmlFor="joinRoomInput">Room ID: </label>
        <input type="text" id='joinRoomInput' placeholder='Room ID' value={joinRoom} onChange={e => setJoinRoom(e.target.value)}/>
        <button onClick={handleFormSubmit}>Join Room</button>
        <br />
        <label htmlFor="createRoomInput">New Room ID: </label>
        <input type='text' id='createRoomInput' placeholder="New Room ID" value={createRoom} onChange={e => setCreateRoom(e.target.value)}/>
        <button className='create-room' onClick={handleFormSubmit}>Create Room</button>
      </form>
    </div>
  )
}

export default Assembly;