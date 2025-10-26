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
      const users = {
        username: username,
        password: password
      };
      
      const response = await api.post("/login",users);      
      const data = response.data;

      const user = data.user;
      
      if (!user) {
        throw new Error('Invalid username or password');
      }
      
      const { password: _, ...userWithoutPassword } = user
      
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

  const register = async (username, password, name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/users");
      const data = response.data;
      
      const existingUser = data.find((u) => u.username === username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
   

      const newUser = {
        id: String(data.length + 1),
        username,
        name,
        password,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
      };
      console.log(newUser);
      
      const register = await api.post("/users", newUser);
      
      if(register){
        setCurrentUser(newUser);
        localStorage.setItem('chatAppUser', JSON.stringify(newUser));
        return newUser;
      }      
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