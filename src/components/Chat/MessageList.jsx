import React, { useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import MessageItem from './MessageItem';

const MessageList = () => {
  const { activeConversation, contacts } = useChat();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.message]);



  // Find other participant
  const getOtherParticipant = () => {
    if (!activeConversation || !currentUser) return null;
    
    
    return contacts.find(contact => contact.id === activeConversation.user_id);
  };

  function getSenderAvatar(convoUserId) {
    if (convoUserId === currentUser?.id) return currentUser.avatar;
    return contacts.find(c => c.id === convoUserId)?.avatar;
  }

  function getName(convoUserId) {
    if (convoUserId === currentUser?.id) return currentUser.name;
    return contacts.find(c => c.id === convoUserId)?.name;
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {otherParticipant && (
        <div className="mb-4 pb-2 border-b border-gray-200">
          <div className="font-medium text-gray-800">
            {otherParticipant.display_name}
          </div>
          <div className="text-sm text-gray-500">
            {otherParticipant.status === 'online' ? 
              'Online' : otherParticipant.status === 'away' ? 
              'Away' : 'Offline'}
          </div>
        </div>
      )}
      
      <div className="space-y-3">

        {activeConversation?.map((convo) => (
          <MessageItem 
            key={convo.id} 
            message={convo} 
            isOwn={convo.user_id === currentUser?.id}
            senderName={
              convo.user_id === currentUser?.id 
                ? currentUser.name 
                : getName(convo.user_id)
            }
            senderAvatar={
              convo.user_id === currentUser?.id 
                ? currentUser.avatar 
                : getSenderAvatar(convo.user_id)
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {activeConversation?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No messages yet. Send a message to start the conversation.
        </div>
      )}
    </div>
  );
};

export default MessageList;
