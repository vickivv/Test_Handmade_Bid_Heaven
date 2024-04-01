import {useState} from "react";
import React from "react";
import{validateEmail} from "../../utils";
import {useNavigate} from "react-router-dom";
import logo1 from '../../Assests/logo1.png'
import Footer from '../../Components/Homepage/Footer';
import '../../Styles/SignUp.css'
import {getCsrfToken} from '../../utils.js'
// import axios from 'axios';
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
            password.value.length>=8 &&
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
    
        const apiUrl = 'http://localhost:8000/api/signup/'; 
        const userData = {
            Fname: firstName,
            Lname: lastName,
            Username: userName,
            Password: password.value,
            Email: email,
            Phone: phone,
        };
        
        // 使用fetch发送请求
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              
            },
         
            body: JSON.stringify(userData)
        })
        .then(response => {
            console.log('Response status:', response.status); 
            if (!response.ok) {
                
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(data => {
                        let errorMessage = data.detail || "An error occurred";
                        if (data.username) errorMessage = "Username already exists!";
                        if (data.email) errorMessage = "Email already exists!";
                        throw new Error(errorMessage);  
                    });
                } else {
                    // 响应不是 JSON 格式
                    throw new Error(`Request failed with status ${response.status}`);
                }
            }
            return response.json(); // 返回解析后的JSON数据
        })
        .then(data => {
            console.log('Success:', data); // 打印成功数据
            alert("Account successfully created!");
            clearForm(); // 清理表单
            navigate("/login"); // 导航到登录页面
        })
        .catch(error => {
            console.error("Error Message:", error.message);
            alert(error.message);  // 显示错误信息
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