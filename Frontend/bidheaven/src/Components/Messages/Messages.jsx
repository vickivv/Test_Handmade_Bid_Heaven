import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import Header from '../Homepage/Header';
import SideBar from './SideBar';
import Nav from './nav';
import Lists from './Lists';
import Footer from '../Homepage/Footer';
import { useAuth } from '../Context/AuthContext'; 

import "../../Styles/Header.css";
import "../../Styles/Messages.css";

function Messages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(true); 

  useEffect(() => {
    if (!user) {
      // Assuming there's a way to determine if the attempted login was for an admin
      const attemptedAdminLogin = localStorage.getItem('attemptedAdminLogin') === 'true';
      const loginPath = attemptedAdminLogin ? '/admin-login' : '/login';
      alert(`You are not logged in. You will be redirected to the ${attemptedAdminLogin ? 'admin' : 'normal user'} login page.`);
      navigate(loginPath);
    }
    // If additional role-based access control is needed, implement here
  }, [user, navigate]);

  return (
    <div className="Message-container">
      <Header />
      <Nav />
   
      <div className="Message-content">
        <div className="side-menu-container">
          <SideBar />
        </div>
        <div className="list-menu-container">
          <Lists />
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Messages;
