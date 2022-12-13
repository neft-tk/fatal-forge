import React, { useEffect, useState } from 'react'
import Socket from '../../../utils/socket';
import API from '../../../utils/API';

export default function Chat({ userId }) {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");


  const findUser = async () => {
    const data = await API.getUser(userId);
    setUser(data.username)
    console.log(user)
  }

  const handleFormSubmit = async (e) => {
    // Prevent Default
    e.preventDefault();
    Socket.Chat.SendMessage(message);
    // Reset the input.
    setMessage("")
    await findUser();
  }

  useEffect(() => {
    Socket.Chat.RecieveMessage()
  }, [])

  return (
    <div className='h-3/4 flex flex-col justify-evenly align-middle items-center'>
      <div className='bg-alt-bg w-2/5 h-2/5'>
      </div>
      <form className='flex flex-col justify-evenly h-1/4 items-center w-2/5' onSubmit={handleFormSubmit}>
        <label for="message-input" className=''>Chat:</label>
        <input id='message-input' type="text" className='w-2/3' value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit" id="send-button" className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFormSubmit}>Send</button>
      </form>
    </div>
  )
}