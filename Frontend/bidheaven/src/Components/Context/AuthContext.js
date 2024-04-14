import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isStaff = localStorage.getItem('is_staff') === 'true';

    if (isStaff) {
      // Admin info
      const adminToken = localStorage.getItem('adminToken');
      const adminUserId = localStorage.getItem('adminUserId');
      const adminEmail = localStorage.getItem('adminEmail');
      const adminfirstname = localStorage.getItem('adminfirstname');

      if (adminToken) {
        setUser({
          token: adminToken,
          userId: adminUserId,
          email: adminEmail,
          isStaff: true,
          adminfirstname,
        });
      }
    } else {
      // normal user info
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const email = localStorage.getItem('email');
      const username = localStorage.getItem('username');

      if (token) {
        setUser({
          token,
          userId,
          email,
          isStaff: false,
          username,
        });
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);

    if (userData.is_staff) {
      // admin login
      localStorage.setItem('adminToken', userData.adminToken);
      localStorage.setItem('adminUserId', userData.adminUserId);
      localStorage.setItem('adminEmail', userData.adminEmail);
      localStorage.setItem('is_staff', 'true');
      localStorage.setItem('adminfirstname', userData.adminfirstname);
     
      navigate('/admin-dashboard');
      window.location.reload();
    } else {
      // normal user login
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('is_staff', 'false');
      localStorage.setItem('username', userData.username);
      navigate('/');
    }

   
  
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUserId');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminfirstname');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('is_staff');
    navigate('/');
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



