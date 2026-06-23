import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { portfolioData } from './PortifolioData';
import './ChatAssistant.css';

const CHAT_API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:5000/chat';

const starterQuestions = [
  'What projects should I look at first?',
  'Which technologies does Fekremariam use?',
  'How can I contact him?',
];

const initialMessage = {
  role: 'assistant',
  content: `Hi, I'm ${portfolioData.name}'s portfolio assistant. Ask me about projects, skills, or the best way to collaborate.`,
};

const buildMessage = (role, content) => ({
  role,
  content,
});

const getErrorMessage = (error) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'I am having trouble connecting right now. You can still explore the portfolio sections for projects, skills, and contact details.';
};

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const addMessage = (role, content) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      buildMessage(role, content),
    ]);
  };

  const requestChatReply = async (message) => {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Chat request failed. Please try again.');
    }

    return data.reply || 'I could not generate a response right now.';
  };

  const sendMessage = async (messageText = input) => {
    const question = messageText.trim();

    if (!question || isLoading) {
      return;
    }

    addMessage('user', question);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await requestChatReply(question);
      addMessage('assistant', reply);
    } catch (error) {
      console.error('Chat assistant error:', error);
      addMessage('assistant', getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleStarterClick = (question) => {
    setIsOpen(true);
    sendMessage(question);
  };

  return (
    <div className="chat-assistant" aria-live="polite">
      <button
        className="chat-toggle-button"
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={27} />}
      </button>

      {isOpen && (
        <section className="chat-window" aria-label="Portfolio assistant">
          <header className="chat-header">
            <div>
              <span className="chat-eyebrow">
                <Sparkles size={14} />
                Portfolio AI
              </span>
              <strong>Ask about Fekremariam</strong>
            </div>
            <button
              className="chat-close-button"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close portfolio assistant"
            >
              <X size={18} />
            </button>
          </header>

          <div className="chat-body">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-message ${message.role}`}
              >
                {message.content}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="starter-questions" aria-label="Suggested questions">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleStarterClick(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="chat-message assistant loading-message">
                <span />
                <span />
                <span />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={isLoading ? 'Thinking...' : 'Ask about projects or skills'}
              disabled={isLoading}
              aria-label="Message"
            />
            <button type="submit" disabled={!canSend} aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default ChatAssistant;
