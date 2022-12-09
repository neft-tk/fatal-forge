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


import React from 'react'
import Grid from './grid/Grid'
import Hand from './hand/Hand'

export default function Game() {
  return (
    <div>
      {/* Players Scores will live outside of the gameboard, potentialy here or anywhere outside of the gameboard div.*/}
      <div className='gameboard'>
        <Grid />
        <Hand />
      </div>
      {/* Probably add some instuctions/settings modals on the margin here. */}
    </div>
  )
}
