// The grid component functions as our gameboard.

// Cards will be placed on the grid via the gridslot component (where the actual data will be housed)

import React, { useState } from 'react'
import Socket from '../../../utils/socket';
import Gridslot from './Gridslot';

export default function Grid() {
  const [action, setAction] = useState();
  useState(()=>{
    Socket.Game.OnPlacedCard((data)=>{
      console.log('onplacedata',data);
      const {card, index, changes} = data;
      setAction({
        type:'place',
        data:{
          card,
          index
        }
      })
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
    })
  },[]);
  const slots = Array(9).fill(null);



  return (
    <div className='flex flex-wrap w-full'>
      {slots.map((x,i)=>{return <Gridslot key={i} index={i} action={action}/>})}
    </div>
  )
}