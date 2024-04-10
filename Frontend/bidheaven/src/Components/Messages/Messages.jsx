import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import Header from '../Homepage/Header';
import SideBar from './SideBar';
import Nav from './nav';
import Lists from './Lists';
import Footer from '../Homepage/Footer';

import "../../Styles/Header.css";
import "../../Styles/Messages.css";

function Messages() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLogged(false);
      alert("You are not logged in. You will be redirected to the login page.")
      navigate('/login')
    }
  }, [navigate]);

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
