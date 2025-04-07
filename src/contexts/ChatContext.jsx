import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from "../utils/api";

export const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load contacts and conversations when user changes
  useEffect(() => {
    if (currentUser) {
      fetchContacts();
      fetchConversations();
    } else {
      setContacts([]);
      setConversations([]);
      setActiveConversation(null);
    }
  }, [currentUser]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      const data = response.data;
      setContacts(data || []);
    } catch (error) {
      setError('Failed to load contacts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const response = await api.get("/messages");
      console.log('res messages:', response);
      
      const userConversations =  response.data;
      
      // Filter conversations for current user
      // const userConversations = data.filter(
      //   (conv) => conv.includes(currentUser.id)
      // );
      
      setConversations(userConversations || []);
      
      // Set active conversation to first one if available
      if (userConversations.length > 0 && !activeConversation) {
        setActiveConversation(userConversations);
      }
    } catch (error) {
      setError('Failed to load conversations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message) => {
    if (!currentUser || !activeConversation) return;
    
    try {
      // Create a new message
      const newMessage = {
      //  id: Date.now().toString(),
         user_id: currentUser.id,
         message,
       // timestamp: new Date().toISOString(),
      };
      console.log('activeConversation:',activeConversation,newMessage);
      let new_message;
      const response = await api.post("/messages",newMessage);
      if(response.status === 201){
         new_message = response.data;
      }
      
      const updatedConversation = [
        ...activeConversation, new_message
      ];

      // const updatedConversation = activeConversation.map(convo => {
      //   if (convo.id === currentUser.id) {
      //     return {
      //       ...convo,
      //       messages: [...convo.message, newMessage],
      //     };
      //   }
      //   return convo;
      // });

      


      console.log('updatedConversation:',updatedConversation);
      
      
      setActiveConversation(updatedConversation);
      
      // Update conversations list
      setConversations(
        conversations.map((c) =>
          c.id === activeConversation.id ? updatedConversation : c
        )
      );
      
      return newMessage;
    } catch (error) {
      setError('Failed to send message');
      console.error(error);
    }
  };

  const startConversation = async (contactId) => {
    if (!currentUser) return;
    
    try {
      // Check if conversation already exists
      const existingConv = conversations.find(
        (c) => 
          c.includes(currentUser.id) && 
          c.includes(contactId)
      );
      
      if (existingConv) {
        setActiveConversation(existingConv);
        return existingConv;
      }
      
      // Create a new conversation
      const newConversation = {
        id: Date.now().toString(),
        messages: [],
      };
      
      // Update state (in a real app, we would save to backend first)
      setConversations([...conversations, newConversation]);
      setActiveConversation(newConversation);
      
      return newConversation;
    } catch (error) {
      setError('Failed to start conversation');
      console.error(error);
    }
  };

  const value = {
    contacts,
    conversations,
    activeConversation,
    loading,
    error,
    sendMessage,
    startConversation,
    setActiveConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};