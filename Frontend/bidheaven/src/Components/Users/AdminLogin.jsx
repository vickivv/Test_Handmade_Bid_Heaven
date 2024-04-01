import React, { useState } from 'react';
import '../../Styles/Admin_login.css';
import Footer from '../Homepage/Footer';
import instance from '../../axios/axios';

function AdminLogin() {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'first_name') {
      setFirstName(value);
    } else if (name === 'last_name') {
      setLastName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      first_name: firstName,
      last_name: lastName,
      password,
    };

    try {
      const response = await instance.post('api/admin/login/', loginData);
      if (response && response.data && response.data.token) {
        console.log('Logged in successfully. Admin User ID:', response.data.userId);
      } else {
        alert("Failed to login: Please check your first name, last name, and password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Login failed: Invalid first name, last name, or password.");
      } else {
        const errorMessage = error.response?.data?.error || "An unexpected error occurred. Please try again.";
        alert(`Login failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="admin-signin-page">
      <div className="signin-container">
        <div className="title">
          <h2>Handmade Bid Heaven Management System</h2>
        </div>
        <div className="signin-form">
          <form onSubmit={handleAdminLoginSubmit}>
            <div className="field">
              <div className="input-container">
                <i className="fas fa-user-circle"></i>
                <input type="text" placeholder="First Name" required name="first_name" value={firstName} onChange={handleInputChange} />
              </div>
            </div>

            <div className="field">
              <div className="input-container">
                <i className="fas fa-user-circle"></i>
                <input type="text" placeholder="Last Name" required name="last_name" value={lastName} onChange={handleInputChange} />
              </div>
            </div>

            <div className="field">
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange} />
              </div>
            </div>
            <button type="submit" className="signin-btn">Sign In</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLogin;



