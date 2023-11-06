import React from 'react'

// homepage that serves up the chatbot
//startChat is a prop that is passed down from App.js

export default function Home({startChat}) {
  return (
    <div>
        <h1>Chatbot With Reactjs</h1>
        <p>Click the button and we'll start chatting!</p>
        <button onClick={startChat}>Clickity click click</button>
    
    </div>
  )
}
