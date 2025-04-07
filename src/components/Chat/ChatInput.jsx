import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};


export default ChatInput;