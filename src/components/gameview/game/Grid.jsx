// The grid component functions as our gameboard.

// Cards will be placed on the grid via the gridslot component (where the actual data will be housed)

import React, { useState } from 'react'
import Socket from '../../../utils/socket';
import Gridslot from './Gridslot';

export default function Grid({ setIsMyTurn, size }) {
  const [action, setAction] = useState();
  useState(() => {
    Socket.Game.OnPlacedCard((data) => {
      Socket.IO.myTurn = false;

      console.log('onplacedata', data);
      const { card, index, changes, state } = data;
      const animLength = 500;
      let total = animLength * (changes.length + 1);
      setAction({
        type: 'place',
        data: {
          card,
          index
        }
      })
      for (let i = 0; i < changes.length; i++) {
        setTimeout(() => {
          setAction(
            {
              type: 'flip',
              change: changes[i]
            }
          );
        }, (500 * i) + 500)
      }
      setTimeout(() => {
        const myTurn = state.turn == Socket.IO.userInfo.username;
        Socket.IO.myTurn = myTurn;
        setIsMyTurn(myTurn)
      }, total);
    })
  }, []);
  const slots = Array(size * size).fill(null);

  function minWidth() {
    return document.querySelector('#grid').clientHeight;
  }

  return (
    <div id='grid' className={'flex flex-wrap justify-around items-around border border-yellow-500 grow max-h-[70%] min-w-[100px] max-w-full shrink aspect-square'}>
      {slots.map((x,i) => {return <Gridslot key={i} index={i} action={action} size={size} modMy={modMy} modThem={modThem}/>})}
    </div>
  )
}