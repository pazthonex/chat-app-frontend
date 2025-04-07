import React from 'react';

const AuthForm = ({ 
  title,
  submitButtonText,
  onSubmit,
  children,
  error,
  isLoading,
  footerContent
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Loading...' : submitButtonText}
          </button>
        </form>
        
        {footerContent && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;