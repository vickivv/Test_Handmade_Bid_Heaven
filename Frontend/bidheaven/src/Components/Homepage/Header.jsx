
import React, { createContext, useState, useContext } from 'react';
import logo1 from '../../Assests/logo1.png'
import '../../Styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';
import {useAuth} from '../Context/AuthContext.js';



function Header(){
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup'); 
};
const handleSignInClick = () => {
  navigate('/login'); 
};
const handleNavigateToAccount = () => {
  navigate('/account');
};
const handleNavigateToBuyer = () => {
  navigate('/buyer/overview');
};
const handleNavigateToMessage = () => {
  navigate('/message');
};

const handleNavigateToSeller = () => {
  navigate('/seller/overview');
}


const toggleDropdown = () => {
  const dropdown = document.getElementById("userDropdown");
  dropdown.classList.toggle("show");
};


return (
  <div className="header">
    <div className="logo-container">
      <img src={logo1} alt="logo" className="logo" />
    </div>
    <div className="search-bar input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search items"
        aria-label="Search items"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button className="btn" id="basic-addon2" type="button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
    {user ? (
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">
              Welcome, {user.username} <i className="fa fa-caret-down"></i>
            </button>
            <div id="userDropdown" className="dropdown-content">
              <ul>
                <li onClick={handleNavigateToAccount} >Account</li>
                <li onClick={handleNavigateToBuyer}    >Buyer</li>
                <li  onClick={handleNavigateToMessage}    >Message</li>
                <li onClick={handleNavigateToSeller}>Selling</li>
                <li>Profile</li>
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </div>
        ) : (
      <div className="auth-buttons">
        <button className="login" onClick={handleSignInClick}>
          Log in
        </button>
        <button className="sign-up" onClick={handleSignUpClick}>
          Sign up
        </button>
        {/* <FontAwesomeIcon icon={faCartShopping} className="cart-icon" /> */}
      </div>
    )}
    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
  </div>
);
}


export default Header