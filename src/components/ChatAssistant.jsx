import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { portfolioData } from './PortifolioData';
import config from '../config.json';
import './ChatAssistant.css';

const API_KEY = config.API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

const starterQuestions = [
  'What projects should I look at first?',
  'Which technologies does Fekremariam use?',
  'How can I contact him?',
];

const buildPortfolioPrompt = (question) => {
  const { name, role, bio, projects, skills } = portfolioData;
  const projectSummary = projects
    .map((project, index) => {
      const technologies = project.technologies.join(', ');
      return `${index + 1}. ${project.title} (${project.type}): ${project.description}. Technologies: ${technologies}.`;
    })
    .join('\n');

  return `
You are the portfolio assistant for ${name}, a ${role}.
Answer in a confident, concise, friendly tone.
Use only the portfolio details below. If the user asks about information that is not listed, say that it is not available in the portfolio yet and suggest contacting ${name}.

Bio:
${bio}

Skills:
${skills.join(', ')}

Projects:
${projectSummary}

User question:
${question}
`;
};

const initialMessage = {
  role: 'assistant',
  content: `Hi, I'm ${portfolioData.name}'s portfolio assistant. Ask me about projects, skills, or the best way to collaborate.`,
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
  }, [messages, isOpen]);

  const appendAssistantMessage = (content) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'assistant', content },
    ]);
  };

  const sendMessage = async (messageText = input) => {
    const question = messageText.trim();
    if (!question || isLoading) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: question },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      if (!model) {
        throw new Error('Gemini API key is missing.');
      }

      const result = await model.generateContent(buildPortfolioPrompt(question));
      const responseText = result.response.text();
      appendAssistantMessage(responseText || 'I could not generate a response right now.');
    } catch (error) {
      console.error('Chat assistant error:', error);
      appendAssistantMessage(
        'I am having trouble connecting right now. You can still explore the portfolio sections for projects, skills, and contact details.'
      );
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
