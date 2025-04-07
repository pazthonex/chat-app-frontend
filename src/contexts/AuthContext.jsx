import React, { createContext, useState, useEffect, useContext } from 'react';
import api from "../utils/api"; // Adjust the import based on your project structure
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('chatAppUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      const response = await api.get("/users");
      console.log('response user:',response);
      
      const data = response.data;
      
      const user = data.find(
        (u) => u.username === username && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid username or password');
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = user;
      
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('chatAppUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password, display_name) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      const response = await api.get("/users");
      const data = response.data;
      
      // Check if username already exists
      const existingUser = data.find((u) => u.username === username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
   

      
      // In a real app, we would add the user to the database
      // For this demo, we'll just simulate success and return a new user
      const newUser = {
        id: String(data.length + 1),
        username,
        display_name,
        password,
        avatar: `https://ui-avatars.com/api/?name=${display_name.replace(' ', '+')}&background=random`
      };
      console.log(newUser);
      
      const register = await api.post("/users", newUser);
      console.log('register::', register);
      
      if(register){
        setCurrentUser(newUser);
        localStorage.setItem('chatAppUser', JSON.stringify(newUser));
        return newUser;
      }
      console.log('register::', register);
      
      throw new Error('Registeration failed');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('chatAppUser');
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};