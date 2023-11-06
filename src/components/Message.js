import React from 'react'

export default function Message({sender, text}) {

  // put the chatter on the right and the chatbot on the left
  const align = sender === "user" ? "right" : "left"

  return (

    <div style={ {textAlign: align} }>
      <p>{text}</p>
    </div>
  )
}
