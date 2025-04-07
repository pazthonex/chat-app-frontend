// Header.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">Chats</h1>
        </div>
        
        {currentUser && (
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <div className="text-sm font-medium text-gray-900">{currentUser.displayName}</div>
              <div className="text-xs text-gray-500">@{currentUser.username}</div>
            </div>
            
            <img 
              src={currentUser.avatar} 
              alt={currentUser.displayName}
              className="w-8 h-8 rounded-full"
            />
            
            <button
              onClick={logout}
              className="ml-4 px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

