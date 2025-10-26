// api.js
/**
 * This file contains functions for interacting with our temporary JSON backend.
 * In a real application, these would make actual API calls to a server.
 */

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Change to your Laravel API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;



// Fetch data from our JSON file
export const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const registerUser = async (users) => {
    try {
           const register = await api.post("/users", users);
           console.log('register::', register);
           
      if (!register.ok) {
        throw new Error('Failed to fetch data');
      }
      return await register.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  
  // In a real app, we would have functions like:
  // export const loginUser = async (username, password) => { ... }
  // export const registerUser = async (userData) => { ... }
  // export const sendMessage = async (conversationId, message) => { ... }
  // etc.