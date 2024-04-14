import {useState} from "react";
import React from "react";
import{validateEmail} from "../../utils";
import {useNavigate} from "react-router-dom";
import logo1 from '../../Assets/logo1.png'
import Footer from '../../Components/Homepage/Footer';
import '../../Styles/SignUp.css'
import {getCsrfToken} from '../../utils.js'
import axiosInstance from '../../axios/axios.js';

const token = localStorage.getItem('token')

const PasswordErrorMessage=()=>{
    return (
        <p className="filedError">Password should have at least 8 characters</p>
    );
};



function SignUp(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); 
    const [password, setPassword] = useState({
        value: "",
        isTouched: false
    });
    const [confirmPassword, setConfirmPassword] = useState({ 
        value: "",
        isTouched: false
    });
    


    const getIsFormValid=()=>{
        return (firstName &&
            lastName&&
            userName&&
            validateEmail(email)&&
            password.value.length>=4 &&
            password.value===confirmPassword.value);
        

    };

    const clearForm=()=>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

    }
    const navigate=useNavigate();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        if (!getIsFormValid()) {
            alert('Please fill in the form correctly.');
            return; 
        }

        const csrfToken = getCsrfToken(); 
        const apiUrl = '/api/signup/';
        const userData = {
            Fname: firstName,
            Lname: lastName,
            Username: userName,
            password: password.value,
            Email: email,
            Phone: phone,
        };

        axiosInstance.post(apiUrl, userData, {
            headers: {
                'X-CSRFToken': csrfToken 
            }
        })
        .then(response => {
            console.log('Account successfully created:', response.data);
            alert("Account successfully created!");
            clearForm();
            navigate("/login");
        })
        .catch(error => {
            console.error("Error during sign up:", error);
            let errorMessage = "An error occurred";
            if (error.response) {
                const contentType = error.response.headers['content-type'];
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    errorMessage = error.response.data.detail || errorMessage;
                    if (error.response.data.username) errorMessage = "Username already exists!";
                    if (error.response.data.email) errorMessage = "Email already exists!";
                } else {
                    errorMessage = `Request failed with status ${error.response.status}`;
                }
            }
            alert(errorMessage);
        });
    };



    console.log(getCsrfToken())


    const goToLogin=()=>{
        navigate("/login");
    }


return (
    <div className="signup-container">
        <div className="title">
            <h2>Sign up</h2> 
            <p>Create your account</p>
        </div>
        
        <div className="signup-form">
            <div className="field-group"> 
                <div className="field">
                    <div className="input-container">
                        <i className="fas fa-user"></i> 
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="input-container">
                        <i className="fas fa-user-friends"></i> {/* Font Awesome Friends icon */}
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-user-circle"></i> {/* Font Awesome Username icon */}
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-envelope"></i> {/* Font Awesome Email icon */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                    />
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-phone"></i> {/* Font Awesome Phone icon */}
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                    />
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-lock"></i> {/* Font Awesome Password icon */}
                    <input
                        type="password"
                        value={password.value}
                        onChange={(e) => setPassword({ ...password, value: e.target.value })}
                        placeholder="Password"
                        required
                    />
                </div>
            </div>
            <div className="field">
                <div className="input-container">
                    <i className="fas fa-lock"></i> {/* Font Awesome Confirm Password icon */}
                    <input
                        type="password"
                        value={confirmPassword.value}
                        onChange={(e) => setConfirmPassword({ ...confirmPassword, value: e.target.value })}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
            </div>
            <button type="submit"   onClick={handleSignUpSubmit}  className="signup-btn">
                Sign Up
            </button>
        </div>
        
        <div className="alternative-signup">
            <span>or</span>
            <p>Already have an account?</p>
            <button className="signin-btn" onClick={goToLogin}>Sign In</button>
        </div>
    </div>
);

};
export default SignUp;