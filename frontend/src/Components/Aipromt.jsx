import React, { useState } from 'react'

export default function Aipromt() {
     const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    // Simulated AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `You said: ${input}` }
      ]);
    }, 500);

    setInput('');
  };


  return (
    <div>
      
     <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-dark text-white p-3">
        <h4 className="m-0">AI Chat</h4>
      </header>

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto bg-light p-3" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
          >
            <div className={`p-2 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white border'}`} style={{ maxWidth: '70%' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>

    </div>
  )
}
