import React, { useState } from 'react'

import Home from './components/Home'
import ChatWindow from './components/ChatWindow';


export default function App() {

    const [chat, setChat] = useState(false)

    const startChat = () => {
        setChat(true)
    }


  return (

    <div>
    {/* use a ternary operator to get the ball rolling with the chatwindow, if false stay on home if true
    open Chatwindow */}
        
        {chat? <ChatWindow /> : <Home startChat={startChat} />}
    </div>
  )
}
