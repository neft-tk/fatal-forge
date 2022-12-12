import React, {useEffect, useState} from 'react'
import Socket from '../../../utils/socket'

const handleFormSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add chat lol
}

export default function Chat() {
    
    return (
  <div className='h-3/4 flex flex-col justify-evenly align-middle items-center'>
    <div className='bg-alt-bg w-2/5 h-2/5'></div>
    <form className='flex flex-col justify-evenly h-1/4 items-center w-2/5'>
      <label for="message-input" className=''>Chat:</label>
      <input type="text" className='w-2/3' />
      <button type="submit" id="send-button" className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFormSubmit}>Send</button>
    </form>
  </div>
    )
}