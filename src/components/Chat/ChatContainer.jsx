import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChat } from '../../contexts/ChatContext';

const ChatContainer = () => {
  const { currentUser } = useAuth();
  const { activeConversation } = useChat();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              <MessageList />
              <ChatInput />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium text-gray-700">Welcome, {currentUser?.displayName}</h3>
                <p className="mt-2 text-gray-500">Select a conversation or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default ChatContainer;