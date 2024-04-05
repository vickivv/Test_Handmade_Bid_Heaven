import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();


  const login = (userData) => {
    setUser(userData); 
    localStorage.setItem('token', userData.token); // if loggedin, store token in userData
    localStorage.setItem('userId', userData.userId);//if loggedin, store userID in userData

    navigate('/'); 
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    setUser(null); 
    navigate('/'); 
  };

  // 准备并传递context的值
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

