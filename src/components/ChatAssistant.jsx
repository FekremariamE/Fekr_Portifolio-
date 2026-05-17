// src/components/ChatAssistant.jsx
import React, { useState, useEffect } from 'react';
import { portfolioData } from './PortifolioData';// Import your data
// Assuming you still have your CSS file for styling
 import './ChatAssistant.css';

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the chat with an introductory message from the AI.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `Hello! I'm an AI assistant for ${portfolioData.name}. Feel free to ask me about my projects, skills, or experience!`,
      }]);
    }
  }, [open, messages]);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botReply = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botReply]);

    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    // ... (Your existing JSX for the ChatAssistant component)
    <div>
      <button className="chat-toggle-button" onClick={toggleChat}>
        💬
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <strong>Chat with Me</strong>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message assistant">
                <div className="typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isLoading ? "Generating response..." : "Ask me anything..."}
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;