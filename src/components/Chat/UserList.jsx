import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';

const UserList = () => {
  const { contacts, startConversation, activeConversation, setActiveConversation, conversations } = useChat();
  const { currentUser } = useAuth();


  // Helper to determine if there's an existing conversation with this contact
  const getExistingConversation = (contactId) => {
    return conversations.find(
      (conv) => 
        conv.includes(currentUser.id) && 
        conv.includes(contactId)
    );
  };

  
  
  const handleContactClick = (contactId) => {
    const existingConv = getExistingConversation(contactId);
    
    if (existingConv) {
      setActiveConversation(existingConv);
    } else {
      startConversation(contactId);
    }
  };

//  Determine if contact is active
  const isActive = () => {
    if (!activeConversation) return false;
    return activeConversation;
  };

  return (
    <div className="overflow-y-auto">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mt-4 mb-2">
        Contacts
      </h3>
      <ul className="space-y-1">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => handleContactClick()}
              className={`flex items-center w-full px-4 py-2 text-left ${
                isActive(contact.id) 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={contact.avatar} 
                  alt={contact.displayName} 
                  className="w-10 h-10 rounded-full"
                />
                <span 
                  className={`absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                    contact.status === 'online' 
                      ? 'bg-green-400' 
                      : contact.status === 'away' 
                      ? 'bg-yellow-400' 
                      : 'bg-gray-400'
                  }`}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{contact.display_name}</p>
                <p className="text-xs text-gray-500">
                  {contact.status === 'online' 
                    ? 'Online' 
                    : contact.status === 'away' 
                    ? 'Away' 
                    : 'Offline'}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;