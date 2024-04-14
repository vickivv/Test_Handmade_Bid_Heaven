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
    const storedAdminFirstName = localStorage.getItem('adminfirstname');

    if (storedToken) {
      setUser({
        token: storedToken,
        userId: storedUserId,
        username:storedUsername,
        email: storedEmail,
        isStaff: storedIsStaff === 'true', 
        adminfirstname:storedAdminFirstName,
      });
    }
  }, []);

  const login = (userData) => {
   console.log('User data:',userData);
    setUser(userData);
    localStorage.setItem('token', userData.token);
   
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('isStaff', String(userData.is_staff)); 
    if (userData.isStaff){
      localStorage.setItem('adminfirstName', userData.adminfirstname);
    }else {
      localStorage.setItem('username', userData.username);
    }

    navigate('/'); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('isStaff');
    localStorage.removeItem('username');
    localStorage.removeItem('adminfirstname');
    navigate('/login'); 
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

