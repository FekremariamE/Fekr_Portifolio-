// src/components/ChatAssistant.jsx
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { portfolioData } from './PortifolioData';// Import your data
// Assuming you still have your CSS file for styling
 import './ChatAssistant.css';
 import config from '../config.json'

const API_KEY = config.API_KEY

if (!API_KEY) {
  console.error("Gemini API Key is not set. Please set REACT_APP_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// This function creates the context prompt for the AI.
const createPortfolioPrompt = () => {
  const { name, role, bio, projects, skills } = portfolioData;

  let prompt = `You are an AI assistant designed to answer questions about ${name}, a ${role}. Your responses should be helpful, friendly, and professional. You should only use the provided information to answer questions.`;

  prompt += `\n\nHere is some information about me:\n`;
  prompt += `- **Bio:** ${bio}\n`;
  prompt += `- **Skills:** ${skills.join(", ")}\n`;
  prompt += `- **Projects:**\n`;
  projects.forEach((proj, index) => {
    // Corrected line: combines title, type, and description
    prompt += `  ${index + 1}. **${proj.title}** (${proj.type}): ${proj.description}\n`;
    prompt += `     - Technologies: ${proj.technologies.join(", ")}\n`;
  });

  return prompt;
};

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
      const promptWithContext = `${createPortfolioPrompt()}\n\nUser Question: ${input}`;
      
      const result = await model.generateContent(promptWithContext);
      const botReplyText = result.response.text();

      const botReply = { role: 'assistant', content: botReplyText };
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