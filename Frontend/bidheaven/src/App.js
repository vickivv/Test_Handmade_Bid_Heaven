import logo from './logo.svg';
import './App.css';
import Nav from './Components/Homepage/Homepage';
import Homepage from './Components/Homepage/Homepage';
import Messages from './Components/Messages/Messages';
import Header from './Components/Homepage/Header';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import SignUp from './Components/Users/Sign_up';
import Login from './Components/Users/Login';
import { AuthProvider } from './Components/Context/AuthContext';
import AdminLogin from './Components/Users/AdminLogin';
import PaymentMethod from './Components/PaymentMethod/PaymentMethod';


function App() {

  
    return (
     

        <Router>
           <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/message" element={<Messages />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/payment-method" element={<PaymentMethod/>} />
            <Route path="/admin-login" element={<AdminLogin/>} />

          </Routes>
        </div>
        </AuthProvider>
      </Router>


    


      
    );



}

export default App;
