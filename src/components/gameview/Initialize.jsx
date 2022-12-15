// The initialize component will act as a pre-game lobby for players who have joined or created a particullar (socket) room.

// Players will join the initialize component from the assembly component and leave for the game component once both player indicate they are ready.

import React, { useEffect, useState } from 'react'
import Socket from '../../utils/socket';
import { CirclePicker } from 'react-color';
import Static from '../../utils/staticHelper'
import { Button, Modal, Label, TextInput} from 'flowbite-react';

export default function Initialize(props) {
  // Use the DeckID as values for the options
  const [deckChoice, setDeckChoice] = useState();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [decks, setDecks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('hi');

  const Alert = (msg) =>{
    setMessage(msg);
    console.log(msg);
    setShowModal(true);
  }

  useEffect(() => {
    Socket.IO.off('game');
    Socket.Game.OnPlayerUpdate((players) => {
      console.log(players);
      if (players.filter(x => x.isReady).length > 1) {
        props.setView('game');
      }

      setConnectedUsers(players);
    })
    Socket.Game.OnStart((username) => {
      const myTurn = Socket.IO.userInfo.username == username;
      Socket.IO.myTurn = myTurn;
    })
    syncUp();
  }, [])

  async function syncUp() {
    const resp = await fetch(`${Static.serverUrl}/api/sockets/games/${props.gameId}`);
    const data = await resp.json();
    console.log('size', data.size);
    props.setSize(data.size);
    setConnectedUsers(data.players);


    const userId = Socket.IO.userInfo.id;
    const r = await fetch(`${Static.serverUrl}/api/users/${userId}`);
    const d = await r.json();

    const deckMap = d.Decks.map(x => { return { name: x.deckName, id: x.id } });
    setDecks(deckMap);
    setDeckChoice(deckMap[0].id)
    props.setDeck(deckMap[0].id)
  }

  const renderUsers = (users) => {
    return (
      <div id='usersContainer' className='flex flex-col flex-wrap justify-between items-center rounded-lg p-6 shadow-lg bg-main-bg shadow-black border border-neutral-800 gap-4 w-fit self-center'>
        <h1 className='text-gray-300 text-4xl rounded-md font-main-text-f self-center'>Room: <span className='font-bold font-alt-text-f text-white text-3xl m-3'>{props.gameId}</span></h1>
        <div className='flex flex-col md:flex-row justify-center w-fit gap-2'>
        {users.map((x, i) => {
          return (
            <div className='text-center border rounded-lg w-72 h-24 hover:scale-105 transition-all' key={i} style={{ borderColor: x.color }}>
              <div className='flex justify-evenly items-center h-3/5'>
                <h3 className='font-semibold text-main-text font-main-text-f text-xl'>{x.userData.username}</h3>
                <div className='border p-1 rounded-full w-1/5 h-1/5' style={{ backgroundColor: x.color }}></div>
              </div>
              <h3 className='h-2/5 font-semibold text-alt-text font-alt-text-f'>{x.isReady ? 'Ready' : 'Preparing'}</h3>
            </div>
          )

        })}
        </div>

      </div>
    )
  }



  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // TODO: Check that values are valid
    // this is ensuring users pick different colors
    const set = new Set(connectedUsers.map(x => x.color));
    if (!Socket.IO.color){
      Alert("You must pick a color.")
    }else if (set.size != connectedUsers.length) {
      Alert('Someone already has that color! Please choose a different one.');
    } else {
      Socket.Game.SetReady();
    }

  }

  function renderModal(){
    return(    <Modal
      show={showModal}
      size="md"
      popup={true}
      >
        <Modal.Header className="modal-header"/>
        <Modal.Body className="modal-body">
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal">
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

    <div className='text-center h-full flex flex-col justify-center gap-10 items-around'>

      {/* <h1 className='text-4xl font-display-text-f'>Game Setup</h1> */}
      
              {/* All Players */}
              {renderUsers(connectedUsers)}
      {/* Options + Players Div */}

        {/* Game Options Form */}
        <form action="" className='flex flex-wrap justify-center items-around gap-10 w-full'>
          
          {/* Color Choice*/}
          <div className='flex flex-col justify-between items-between gap-6 shadow-lg bg-main-bg shadow-black border border-neutral-800 p-6 rounded-lg'>
            <label className='font-bold text-2xl font-main-text-f'>Choose Your Color</label>
            <CirclePicker className='flex justify-evenly items-center' onChange={(c, e) => { Socket.Game.PickColor(c.hex); Socket.IO.color = c.hex }} />
          </div>

          {/* Deck Choice */}
          <div className='flex flex-col justify-evenly items-center shadow-lg bg-main-bg shadow-black border border-neutral-800 p-6 rounded-lg gap-2 w-fit'>
            <label htmlFor="deckChoice" className='font-bold text-2xl font-main-text-f'>Choose Your Deck</label>
            <select name="deck-choice" id="deckChoice" className='bg-black font-alt-text-f rounded' required onChange={e => {
              props.setDeck(e.target.value); setDeckChoice(e.target.value); console.log(e.target.value)
            }}>
              {decks.map((x, i) => { return (<option className='font-alt-text-f' value={x.id} key={i} >{x.name}</option>) })}
            </select>
            <button className='button-style' type='submit' onClick={handleFormSubmit}>Ready</button>
          </div>


          {/* Ready */}
         
        </form>

    </div>
    {renderModal()}
</>
  )
}