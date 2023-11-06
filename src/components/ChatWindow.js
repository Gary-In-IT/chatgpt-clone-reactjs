import React, { useState, useEffect } from 'react'



import Message from './Message';
import NowLoading from './NowLoading';
import axios from 'axios'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

  // load from  local storage
  const loadLocal = () => {
    const chatHistory = localStorage.getItem('chatHistory')
    if (chatHistory) {
      return JSON.parse(chatHistory)
    } else {
      return []
    }
  }
   


  // save messages to local storage
 const saveToLocal = (chatHistory) => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
  }


  // load chat history at the start
  useEffect(() => {
    const chatHistory = loadLocal()
    setMessages(chatHistory)
  }, [])

  // load any saved messages
  useEffect(() => {
    const savedMessages = loadLocal()
    if (savedMessages.length > 0) {
      setMessages(savedMessages)
    }
  }, [])


  const sendMessage = async (input) => {
    // add user message to the state
    const userMessage = { sender: "user", text: input }
    setMessages([...messages, userMessage])

    // save to local storage
    saveToLocal([...messages, userMessage]) 


    console.log("user message: ", userMessage)

    setLoading(true)

    // API headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY       
    }

    // API data
    const data = {
      model : 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: input}]
    }

    try {
      // try sending to API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        data,
        { headers }
      )

      console.log("RESPONSE: ", response)

      // add response to the state
      const aiMessage = {
        sender: "ai",
        text: response.data.choices[0].message.content.trim()
      }

      setMessages([...messages, userMessage, aiMessage])
      saveToLocal([...messages, userMessage, aiMessage])

    } catch(error) {
      console.log(error)
    }

    setLoading(false)

  };


  const handleSubmit = (e) => {
    e.preventDefault() // prevent page refresh
    if (input.trim() !== "") {
      sendMessage(input)
      setInput("")
    }
  }


  const handleInput = (e) => {
    setInput(e.target.value)
  }


  return (
    <div className='chatWindow'>
      {/* Display all messages */}
      {messages.map((message, index) => ( 
        <Message 
        key={index} 
        sender={message.sender} 
        text={message.text} />
      ))}


      {/* Display loading indicator */}
      {loading && <NowLoading /> }


      {/* Display input */}
        <form onSubmit={handleSubmit} className='inputForm'>
          <input 
           type='text'
           value={input}
           onChange={handleInput} />
           <button type='submit'>Send</button>
        </form>

    
    </div>
  )
}
