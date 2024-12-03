import React, { useState, useEffect, useRef } from 'react';
import './CustomerSupportChatbot.css'; // Import external CSS

const CustomerSupportChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hello! I'm our customer support assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot response (replace with API integration)
  const generateBotResponse = (userMessage) => {
    const responses = {
      hello: 'Hi there! How can I assist you today?',
      help: "I'm here to help. What specific issue are you experiencing?",
      pricing: 'Our pricing details can be found on our website. Would you like more information?',
      default: 'I understand you have a query. Could you provide more details?',
    };

    const lowercaseMessage = userMessage.toLowerCase();
    const response = Object.keys(responses).find((key) =>
      lowercaseMessage.includes(key)
    );

    return responses[response || 'default'];
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length,
      text: inputMessage,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 1,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="chatbot-container">
      {/* Chat Header */}
      <div className="chatbot-header">
        <span className="chatbot-icon">🤖</span>
        <h2 className="chatbot-title">Customer Support</h2>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chatbot-message ${
              message.sender === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot'
            }`}
          >
            {message.sender === 'bot' && <span className="chatbot-avatar">👤</span>}
            <div className="chatbot-text">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="chatbot-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="chatbot-input-field"
        />
        <button onClick={handleSendMessage} className="chatbot-input-button">
          ➢
        </button>
      </div>
    </div>
  );
};

export default CustomerSupportChatbot;
