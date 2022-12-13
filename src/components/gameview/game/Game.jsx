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

export default function Game({ deckId, size }) {
  const [deck, setDeck] = useState(null);
  const [myTurn, setMyTurn] = useState();
  const [players, setPlayers] = useState([]);
  const [slots, setSlots] = useState(Array(size*size).fill(null));
  

  useEffect(() => {
    Socket.IO.slots = Array(size*size).fill(null);
    Socket.IO.setSlot = (index,color)=>{
      Socket.IO.slots[index] = color;
      setSlots([...Socket.IO.slots])
      console.log(Socket.IO.slots);
    }
    setIsMyTurn(Socket.IO.myTurn)
    getHand();
  }, [])

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

  return (
      <div className='gameboard flex flex-col justify-center items-center h-full w-full border p-3'>
        <Grid setIsMyTurn={setIsMyTurn} size={size} setPlayers={setPlayers}/>
        <h1 className='text-4xl'>{myTurn ? 'Your Turn' : 'Waiting for opponent'}</h1>
        {deck ? <Hand deck={deck} /> : ''}
        <div className='flex w-full justify-around'>
          {players.map((x,i)=>
            <div key={i} style={{color:x.color}}>
              <h1>{x.userData.username}</h1>
              <h1>{getScore(x.color)}</h1>
            </div>
          )}
        </div>
      </div>

  )
}
