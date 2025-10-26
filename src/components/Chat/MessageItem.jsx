import React from 'react';

const MessageItem = ({ message, isOwn, senderName, senderAvatar }) => {  
  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-xs md:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex-shrink-0">
          <img 
            src={senderAvatar} 
            alt={senderName} 
            className="w-8 h-8 rounded-full"
          />
        </div>
        
        <div className={`mx-2 ${isOwn ? 'text-right' : 'text-left'}`}>
            
              <div className="text-sm text-gray-600 font-semibold mb-1">
                 {senderName }
              </div>
           

          <div 
            className={`px-4 py-2 rounded-lg inline-block ${
              isOwn 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {message.message}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {formatTime(message.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};


export default MessageItem;
