import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('email');
    const storedUsername = localStorage.getItem('username');
    const storedIsStaff = localStorage.getItem('isStaff');

    if (storedToken) {
      setUser({
        token: storedToken,
        userId: storedUserId,
        email: storedEmail,
        isStaff: storedIsStaff === 'true', 
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('isStaff', String(userData.is_staff)); 
    navigate('/'); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('isStaff');
    navigate('/login'); 
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

