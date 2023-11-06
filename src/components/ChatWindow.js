import React, { useState } from 'react'


import Message from './Message';
import NowLoading from './NowLoading';


export default function ChatWindow() {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")


  return (
    <div>
      <Message />
      <NowLoading />
    
    </div>
  )
}
