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

import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Hand from './Hand';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import React, { useEffect, useState } from 'react'
import Grid from './Grid'
import Hand from './Hand'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Socket from '../../../utils/socket'

export default function Game({deckId,size}) {
  const [deck, setDeck] = useState(null);
  const [myTurn, setMyTurn] = useState();

  useEffect(()=>{
    setIsMyTurn(Socket.IO.myTurn)
    getHand();
  },[])

  const setIsMyTurn = (isMyTurn)=>{
    setMyTurn(isMyTurn);
    // if (isMyTurn){
    //   alert("Your Turn");
    // }else {
    //   alert("Waiting for opponent");
    // }
  }


  async function getHand() {
    const res = await fetch(`http://localhost:3001/api/decks/${deckId}`);
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
<<<<<<< HEAD
    <div>
      {/* Players Scores will live outside of the gameboard, potentialy here or anywhere outside of the gameboard div.*/}
      <div className="gameboard flex flex-col justify-center items-center w-full max-w-full">
        <Grid />

        {deck ? <Hand deck={deck} /> : ''}
      </div>
      {/* Probably add some instuctions/settings modals on the margin here. */}
    </div>
  );
=======
      <div className='gameboard flex flex-col justify-center items-center h-full w-full border p-3'>
        <Grid setIsMyTurn={setIsMyTurn} size={size}/>
        <h1 className='text-4xl'>{myTurn ? 'Your Turn' : 'Waiting for opponent'}</h1>
        {deck ? <Hand deck={deck} /> : ''}
      </div>

  )
>>>>>>> dev
}
