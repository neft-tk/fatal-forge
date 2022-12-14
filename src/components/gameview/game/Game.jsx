// The game component houses all game elements: Deck, Hand, Grid (Gameboard)

// GAME SETUP - PRE TURN ONE

// Two players will enter the game after readying in the initialize component, their deck choice and color will be noted.
// Create an array of the fresh deck, all 20 cards.
// Render the Grid, Gridslots, Hand, Handslots and "Deck" (Most of the functionality with the Deck will actually be handled in this component).
// Flip a coin to see who goes first Roll(). let goingFirst = true || false (Revisit if we want more user control over who goes first.)
// Fill the player's hand with 5 random cards from thier deck (method: drawCard(); X 5 OR drawToFull();)

// GAME START - TURN ONE UNTIL THE GAME ENDS - if goingFirst = true that player will control turn one.

// Whoevers turn it is will be able to place a card from their hand into an empty grid slot.
// When a card is placed into an empty grid slot (socket recieves onCardPlaced()),
//    Ping socket that a card has been placed.
//    Remove the card from the players hand.
//    Reconstruct the component from the card data on the backend
//    Place the new (played) card into that grid slot.
//    Execute any changes that the placement of that card provoked.
//  if all Gridslots are full (after a slot has been filled):
//    Whoever has the highest number of Gridslots controlled wins.
//    PMVP: Take the players to a stats screen.
//    qMVP: Take the players back to the play screen.

import React, { useEffect, useState } from 'react'
import Grid from './Grid'
import Hand from './Hand'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Socket from '../../../utils/socket'
import Static from '../../../utils/staticHelper'
import { Button, Modal, Label, TextInput} from 'flowbite-react';
import { useNavigate } from "react-router-dom";

export default function Game({ deckId, size, gameId, setView}) {
  const [deck, setDeck] = useState(null);
  const [myTurn, setMyTurn] = useState();
  const [players, setPlayers] = useState([]);
  const [slots, setSlots] = useState(Array(size*size).fill(null));
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('hi');
  const [gameEnd, setGameEnd] = useState(false);
  const navigate = useNavigate();

  const Alert = (msg) =>{
    setMessage(msg);
    console.log(msg);
    setShowModal(true);
  }

  useEffect(() => {
    setup();
    Socket.IO.slots = Array(size*size).fill(null);
    Socket.IO.setSlot = (index,color)=>{
      Socket.IO.slots[index] = color;
      setSlots([...Socket.IO.slots])
      console.log(Socket.IO.slots);
    }
    setIsMyTurn(Socket.IO.myTurn)
    getHand();
  }, [])

  const setup = async() =>{
    const resp = await fetch(`${Static.serverUrl}/api/sockets/games/${gameId}`);
    const data = await resp.json();
    console.log('this', data)
    const op = data.players.find(x=>x.userData.username != Socket.IO.userInfo.username);
    if (op){
      Socket.IO.opponent = op;
      console.log('opponent',op);
    }
    setPlayers(data.players);
  }

  useEffect(()=>{
    if (!gameEnd){
      return;
    }
    //todo: hit our endpoint to update gamehistory/stats

    //todo: make a modal that gives choice to go to assembly or home
    Alert('game ended');

  },[gameEnd])

  const getScore = (color)=>{
    return slots.filter(x=>x == color).length;
  }

  useEffect(()=>{
    return ()=>{
      console.log('unmount')
      Socket.Game.Leave();
    }
  },[])

  const setIsMyTurn = (isMyTurn) => {
    setMyTurn(isMyTurn);
    // if (isMyTurn){
    //   alert("Your Turn");
    // }else {
    //   alert("Waiting for opponent");
    // }
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
            <div className="flex justify-between gap-4">
              <Button
                color="gray"
                onClick={()=>{setView('assembly')}}
              >
                New Game
              </Button>
              <Button
                color="gray"
                onClick={()=>{navigate('/lobby')}}
              >
                Go Home
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>)
  }


  async function getHand() {
    const res = await fetch(`${Static.serverUrl}/api/decks/${deckId}`);
    console.log(deckId);
    console.log(res);
    const data = await res.json();
    console.log(data);
    setDeck(
      data.Cards.map((x) => {
        return {
          name: x.cardName,
          compass: [x.topAttack, x.rightAttack, x.bottomAttack, x.leftAttack],
          class: x.class,
          imagePath: x.imagePath,
        };
      })
    );
  }

  const getLocation = () =>{
    if (!players.length !=2){
      return '50'
    }

    const a = getScore(players[0].color);
    const b = getScore(players[1].color);

    const total = a + b;
    console.log(total);

    if (total){
      setLoc(toString((a/total)*100)) ;
    }else{
      setLoc('50')
    }

    const middle = 50;
    const ratioA = total/a;
    const ratioB = total/b;
  }

  setInterval(()=>{
    getLocation();
  },1000)

  const [loc, setLoc] = useState('50');

  return (
    <>
      <div className='gameboard flex flex-col justify-between items-center h-full w-full p-3 grow shrink'>
        <div className='w-full mb-2'> 
          <div className='flex w-full justify-between'>
            {players.map((x,i)=>
            <>
              <div key={i} style={{backgroundColor:x.color, opacity:0.75}} className={`rounded-full aspect-square h-14 border border-neutral-900 border-4 relative mt-4 flex justify-center items-center font-display-text-f font-bold`}>
                <h1 style={{backgroundColor:x.color}} className={`absolute -top-5 border border-neutral-900 border-4 rounded-t-xl py-1 px-3 whitespace-nowrap ${i ? 'text-end -right-1 rounded-bl-xl' : '-left-1 rounded-br-xl'}`}>{x.userData.username}</h1>
                <h1 className='mt-4 font-alt-text-f'>{getScore(x.color)}</h1>
              </div>
              {!i && <h1 className='text-4xl font-display-text-f'>{myTurn ? 'Your Turn' : 'Waiting'}</h1>}
            </>
            )}
          </div>
          {players[0] && <div style={{background: `linear-gradient(90deg, ${players[0].color} 0%, ${players[1].color} 100%)`}} className='h-2 w-full relative'>
            {/* <div style={{left:`${loc}%`}} className='h-4 border w-2 absolute -top-1'></div> */}
          </div>}
        </div>

        <Grid setIsMyTurn={setIsMyTurn} size={size} setPlayers={setPlayers} setGameEnd={setGameEnd}/>
        

        {deck && <Hand deck={deck} />}


      </div>
      {renderModal()}
    </>
  )
}
