import React, { useState } from 'react'

import Home from './components/Home'
import ChatWindow from './components/ChatWindow';
import './App.css'
import ErrorBoundary from './components/ErrorBoundary';



export default function App() {

    const [chat, setChat] = useState(false)

    const startChat = () => {
        setChat(true)
    }


  return (

    <div className='App'>
      <ErrorBoundary>
        {chat? <ChatWindow /> : <Home startChat={startChat} />}
      </ErrorBoundary>
    </div>
  )
}
