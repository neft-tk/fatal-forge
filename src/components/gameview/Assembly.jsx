// The assembly component will handle players joining and creating rooms to play with others.

// Once a player has joined a room, they will be taken to that room, in the initialize component.

import React, { useEffect, useState } from 'react'
import Socket from '../../utils/socket';
import Static from '../../utils/staticHelper'
import { Button, Modal, Label, TextInput} from 'flowbite-react';

function Assembly({ setView, setGameId }) {
  const [joinRoom, setJoinRoom] = useState("");
  const [createRoom, setCreateRoom] = useState("");
  const [gridSize, setGridSize] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('hi');

  const Alert = (msg) =>{
    setMessage(msg);
    console.log(msg);
    setShowModal(true);
  }

  useEffect(() => {
    Socket.IO.off('game');
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Based on which button was clicked.
    switch (e.target.id) {
      case "join-room": {
        if (!joinRoom){
          Alert('Must enter a room name.')
        }
        // Going to hit our api for a response to see if that room exists
        const resp = await fetch(`${Static.serverUrl}/api/sockets/games/${joinRoom}`);

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
            Alert('That room is full.')
          }
        } else {
          Alert(`That room doesn't exist`);
        }

      }
        break;

      case "create-room": {
        if(!createRoom){
          Alert("Room ID cannot be empty.")
          return;
        }
        // Going to hit our api for a response to see if that room already exists
        const resp = await fetch(`${Static.serverUrl}/api/sockets/games/${createRoom}`);

        // if the response is ok then that room already exists
        if (resp.ok) {
          //todo: change the alert to a modal when we get deeper in styling
          Alert('Room with that name already exists. Try another.')
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

  function renderModal(){
    return(    <Modal
      show={showModal}
      size="md"
      popup={true}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="gray"
                onClick={()=>{setShowModal(false)}}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>)
  }

  return (
    <>
    <div className='flex flex-col h-full w-full justify-center items-center'>
      

        <h3 className='text-4xl font-display-text-f mb-6'>Join or Create a room to play!</h3>
        <form action="" className='flex flex-col md:flex-row justify-around items-around w-fit gap-6'>
          
          <div className='flex flex-col items-center justify-between font-main-text-f rounded-lg p-6 shadow-lg bg-main-bg shadow-black border border-neutral-800 gap-4 h-full'>
            <label htmlFor="joinRoomInput" className='text-2xl font-semibold alt-text-f'>Join</label>
            <input type="text" id='joinRoomInput' placeholder='Room ID' className='font-main-text-f shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={joinRoom} onChange={e => setJoinRoom(e.target.value)} />
            <button id='join-room' className='font-main-text-f bg-highlight-orange hover:bg-active-orange text-white font-bold py-2 px-4 rounded' onClick={handleFormSubmit}>Join Room</button>
          </div>
          <div className='flex flex-col items-center justify-between font-main-text-f rounded-lg p-6 shadow-lg bg-main-bg shadow-black border border-neutral-800 gap-4'>
            <label htmlFor="createRoomInput" className='text-2xl font-semibold'>Create</label>
            <div className='relative'>
              <input type='text' id='createRoomInput' placeholder="New Room ID" className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={createRoom} onChange={e => setCreateRoom(e.target.value)} />
              <select id='gridSize' className='bg-alt-bg font-alt-text-f absolute right-0 h-full rounded-r border-none' defaultValue={3} onChange={(e) => { setGridSize(e.target.value) }}>
                <option value={3}>3x3</option>
                <option value={4}>4x4</option>
                <option value={5}>5x5</option>
              </select>
            </div>

            <button id='create-room' className='bg-highlight-orange hover:bg-active-orange text-white font-bold py-2 px-4 rounded' onClick={handleFormSubmit}>Create Room</button>
          
          </div>
        </form>

    </div>
    {renderModal(message)}
  </>
  )
  
}

export default Assembly;