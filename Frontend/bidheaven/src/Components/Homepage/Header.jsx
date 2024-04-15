import React, { useState, useEffect, useCallback } from 'react';
import logo1 from '../../Assets/logo1.png';
import '../../Styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.js';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const initialState = user
    ? user.isStaff
      ? { showDropdown: false, showAdminDropdown: true, isAdminDropdownShown: true }
      : { showDropdown: true, showAdminDropdown: false, isAdminDropdownShown: false }
    : { showDropdown: false, showAdminDropdown: false, isAdminDropdownShown: false };

    const [state, setState] = useState(initialState);




    const { showDropdown, showAdminDropdown, isAdminDropdownShown } = state;




    const setShowDropdown = useCallback((value) => {
        setState((prevState) => ({ ...prevState, showDropdown: value }));
    }, []);

    const setIsAdminDropdownShown = useCallback((value) => {
        setState((prevState) => ({ ...prevState, isAdminDropdownShown: value }));
    }, []);

    const setShowAdminDropdown = useCallback((value) => {
        setState((prevState) => ({ ...prevState, showAdminDropdown: value }));
    }, []);

    useEffect(() => {
      if (user) {
          if (user.isStaff) {
              setShowDropdown(false);
              setIsAdminDropdownShown(true);
              setShowAdminDropdown(true);
          } else {
              setShowDropdown(true);
              setIsAdminDropdownShown(false);
              setShowAdminDropdown(false);
          }
      }
  }, [user, setShowDropdown, setIsAdminDropdownShown, setShowAdminDropdown]);





    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleSignInClick = () => {
        navigate('/login');
    };

    const handleNavigateToBuyer = () => {
        navigate('/buyer/overview');
    };

    const handleNavigateToMessage = () => {
        navigate('/message');
    };

    const handleNavigateToSeller = () => {
        navigate('/seller/overview');
    };

    const handleNavigateToAccount = () => {
        navigate('/account');
    };

    const handleNavigateToHome = () => {
        navigate('/');
    };

    const handleMessage = () => {
     
      navigate('/message');
  };




    const handleAdminLogout = () => {
        logout();
        navigate('/admin-login');
    };





    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setShowAdminDropdown(false);
    };

    const toggleAdminDropdown = () => {
        setShowAdminDropdown(!showAdminDropdown);
        setShowDropdown(false);
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
                user.isStaff ? (
                    <div className="admin-dropdown">
                        <button className="admin-dropbtn" onClick={toggleAdminDropdown}>
                            Welcome, {user.adminfirstname}
                            <i className="fa fa-caret-down"></i>
                        </button>
                        {showAdminDropdown && (
                            <div id="adminDropdown" className={`admin-dropdown-content ${showAdminDropdown ? 'show' : ''}`}
                            onMouseLeave={() => setShowDropdown(false)}
                            
                            
                            >
                                <ul>
                                < li onClick={handleMessage}>Message</li>
                                    <li onClick={handleAdminLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="dropdown">
                        <button className="dropbtn" onClick={toggleDropdown}>
                            Welcome, {user.username}
                            <i className="fa fa-caret-down"></i>
                        </button>
                        {showDropdown && (
                            <div id="userDropdown" className={`dropdown-content ${showDropdown ? 'show' : ''}`}
                            onMouseLeave={() => setShowDropdown(false)}
                            >
                                <ul>
                                    <li onClick={handleNavigateToAccount}>Account</li>
                                    <li onClick={handleNavigateToBuyer}>Buyer</li>
                                    <li onClick={handleNavigateToMessage}>Message</li>
                                    <li onClick={handleNavigateToSeller}>Selling</li>
                                    <li onClick={handleNavigateToHome}>Home</li>
                                  

                                    <li onClick={logout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )
            ) : (
                <div className="auth-buttons">
                    <button className="login" onClick={handleSignInClick}>
                        Log in
                    </button>
                    <button className="sign-up" onClick={handleSignUpClick}>
                        Sign up
                    </button>
                </div>
            )}
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
        </div>
    );
}

export default Header;