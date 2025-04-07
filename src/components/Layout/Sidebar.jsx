// Sidebar.jsx
import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import UserList from '../Chat/UserList';

const Sidebar = () => {
  const { conversations, activeConversation, setActiveConversation, contacts } = useChat();
  const { currentUser } = useAuth();
  

  // Get display name for conversation
  const getConversationName = (conversation) => {
    if (!conversation || !currentUser) return '';
    
    // const otherParticipantId = conversation.participants.find(
    //   id => id !== currentUser.id
    // );
    
    // const otherParticipant = contacts.find(contact => contact.id === otherParticipantId);
    
    return conversation?.display_name || 'Unknown';
  };

  // Get last message preview
  const getLastMessage = (conversation) => {
    if (!conversation?.messages?.length) return 'No messages yet';
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.text.length > 20
      ? `${lastMessage.text.substring(0, 20)}...`
      : lastMessage.text;
  };

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Messages</h2>
      </div>
      
      {/* <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  onClick={() => setActiveConversation(conversation)}
                  className={`w-full px-4 py-3 flex items-center text-left ${
                    activeConversation?.id === conversation.id
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src=""
                      alt={getConversationName(conversation)}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {getConversationName(conversation)}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {getLastMessage(conversation)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            No conversations yet
          </div>
        )}
      </div> */}
      
      <div className="border-t border-gray-200">
        <UserList />
      </div>
    </div>
  );
};


export default Sidebar;