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

import BuyerDashboard from './Pages/Buyer_dashboard';
import Orders from './Pages/Orders';
import Bids from './Pages/Bids'
import OrderDetail from './Pages/OrderDetail';
import BidDetail from './Pages/BidDetail';
import Overview from './Components/Dashboard/overview'
import Review from './Components/Dashboard/review'
import Payment from './Pages/payment'
import AddAddressPage from './Pages/AddAddressPage'
import AddressBook from './Components/Users/AddressBook'
import ThankYouPage from './Pages/ThankYouPage'


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


            <Route path="/review" element={<Review />} />
            <Route path="/addressbook" element={<AddressBook />} />
            <Route path="/add_address" element={<AddAddressPage />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="/buyer/*" element={<BuyerDashboard />}>
              <Route path="overview" element={<Overview />} />
              <Route path="order" element={<Orders />} />
              <Route path="order/:orderId" element={<OrderDetail />} />
              <Route path="bid" element={<Bids />} />
              <Route path="bid/:BiddingID" element={<BidDetail />} />
            </Route>
          </Routes>
        </div>
        </AuthProvider>
      </Router>


    


      
    );



}

export default App;
