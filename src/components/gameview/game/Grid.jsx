// The grid component functions as our gameboard.

// Cards will be placed on the grid via the gridslot component (where the actual data will be housed)

import React, { useState } from 'react'
import Socket from '../../../utils/socket';
import Gridslot from './Gridslot';

export default function Grid({setIsMyTurn,size, setPlayers, setGameEnd}) {
  const [action, setAction] = useState();

  useState(()=>{
    Socket.Game.OnPlacedCard((data)=>{
      Socket.IO.myTurn = false;

      console.log('onplacedata',data);
      const {card, index, changes, state} = data;
      

      const animLength = 500;
      let total = animLength * (changes.length + 1);
      setAction({
        type:'place',
        data:{
          card,
          index
        }
      })
      if (state.slots.filter(x=>x!=null).length == size*size){
        setTimeout(()=>{
          console.log('gameend')
          setGameEnd(true);
        },total)
      }

      for (let i = 0; i < changes.length; i++){
        setTimeout(()=>{
          setAction(
            {
              type:'flip',
              change: changes[i]
            }
          );

        },(500*i) + 500)
      }
      setTimeout(() => {
        const myTurn = state.turn == Socket.IO.userInfo.username;
        Socket.IO.myTurn = myTurn;
        setIsMyTurn(myTurn)
        setPlayers(state.players);
      }, total);
    })
  },[]);
  const slots = Array(size*size).fill(null);

  function minWidth(){
    return document.querySelector('#grid').clientHeight;
  }

  return (
    <div id='grid' className={'flex flex-wrap justify-around items-around bg-black/30 p-4 grow rounded-xl max-h-[70%] min-w-[100px] max-w-full shrink aspect-square'}>
      {slots.map((x,i)=>{return <Gridslot key={i} index={i} action={action} size={size}/>})}
    </div>
  )
}