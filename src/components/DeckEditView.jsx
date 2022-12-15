import React, { useEffect, useState } from "react";
import Static from '../utils/staticHelper'
function DeckEditView({ setDeckData, deckData }) {

    const removeCard = (id) => {
        const newDeck = [...deckData.filter(x=>x.id != id)];
        setDeckData(newDeck);
    }



    useEffect(() => {
        console.log('data', deckData);
    }, [deckData]);


    return (
        <div className="flex flex-wrap gap-2 overflow-y-auto overflow-x-hidden p-2 gl-scrollbar h-full bg-main-bg">
            {deckData.map((card, index) => 
            <button className="relative w-24 h-24 bg-neutral-700 hover:scale-125 hover:z-10 hover:border-2 hover:border-sky-500" key={index} onClick={(e)=>{ e.preventDefault();removeCard(card.id)}}>    
                                 <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mt-[-10px] left-[50%] top-[11%] text-center z-10 text-black font-bold'>{card.topAttack}</h3>
      <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mt-[-10px] left-[14%] top-[48%] text-center z-10 text-black font-bold'>{card.leftAttack}</h3>
      <h3 className='absolute w-[20px] h-[20px] mr-[-10px] mt-[-10px] right-[13%] top-[48%] text-center z-10 text-black font-bold'>{card.rightAttack}</h3>
      <h3 className='absolute w-[20px] h-[20px] ml-[-10px] mb-[-10px] left-[50%] bottom-[16%] text-center z-10 text-black font-bold'>{card.bottomAttack}</h3>
      <img src={`${Static.serverUrl}/api/images/${card.imagePath}`} className='w-1/2 h-1/2 absolute left-[25%] top-[25%]'></img>
      <img src={`${Static.serverUrl}/api/images/cardsprite/Card-Face.png`} className='' />
                {/* {card.cardName}, L:{card.leftAttack}, R:{card.rightAttack}, T:{card.topAttack}, B:{card.bottomAttack} */}
            </button>           
            )} 
        </div>
    )

}

export default DeckEditView;