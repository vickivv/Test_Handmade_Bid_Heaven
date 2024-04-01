import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Homepage/Footer';
import "../../Styles/Login.css";
import instance from '../../axios/axios';
import { useAuth } from '../Context/AuthContext.js';


function Login() {
  const { login ,logout} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const goToRegister = () => {
    navigate("/signup");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
  
    try {
      const response = await instance.post('api/login/', loginData);
      if (response && response.data && response.data.token) {
        login({
          token: response.data.token,
          username: response.data.username, 
          userId: response.data.userId,
        });
        console.log('Logged in successfully. User ID:', response.data.userId);
        navigate("/"); 
      } else {
      
        alert("Failed to login: Please check your username and password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Login failed: Invalid username or password.");
      } else {
        const errorMessage = error.response?.data?.error || "An unexpected error occurred. Please try again.";
        alert(`Login failed: ${errorMessage}`);
      }
    }
  };
  
  const handleAdminLogin =()=>{
    navigate('/admin-login')

  }

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };


  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="title">
          <h2>Welcome to Handmade Bid Heaven</h2>
        </div>
        <div className="signin-form">
          <form onSubmit={handleLoginSubmit}>
            <div className="field">
              <div className="input-container">
                <i className="fas fa-user-circle"></i>
                <input type="text" placeholder="Username" required name="username" value={username} onChange={handleInputChange} />
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
        <div className="admin-login" onClick={handleAdminLogin} >Admin login only </div>

        <div className="alternative-signup">
          <span>or</span>
          <p>Not have an account?</p>
          <button className="signup-btn" onClick={goToRegister}>Sign Up</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
         

export default Login;