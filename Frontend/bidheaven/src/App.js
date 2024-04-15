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
import Account from './Components/Users/Account'

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
import NewMessageForm from './Components/Messages/NewMessageForm';
import { AddBids } from './Bid/Addbids.js';
import { Products } from "./Components/Seller/productspage/Products";
import { SellerOverview } from "./Components/Seller/overviewpage/SellerOverview";
import { SellerOrders } from './Components/Seller/orders/SellerOrders';
import { SellerLayout } from "./Components/Seller/dashboard/SellerLayout";
import {ActiveLists} from "./Components/Seller/productspage/ActiveLists";
import {SoldOutLists} from "./Components/Seller/productspage/SoldOutLists";
import { AddNewProduct } from "./Components/Seller/productspage/AddNewProduct";
import { Bidding } from "./Components/Seller/biddings/Bidding";
import { SellerOrderDetail } from "./Components/Seller/orders/SellerOrderDetail";
import { CompareBids } from "./Components/Seller/biddings/CompareBids";
import { MessageProvider } from './Components/Context/MessageContext';

import Sent from './Components/Messages/Pages/Sent';
import Inbox from './Components/Messages/Pages/Inbox';
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import AdminOverview from './Components/Admin/AdminOverview.jsx';
import ManageReports from './Components/Admin/ManageReports.jsx';
import Ceramics from './Components/Categories/Ceramics.jsx';
function App() {

  
    return (
     

        <Router>
           <AuthProvider>
            <MessageProvider>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/message" element={<Messages />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/payment-method" element={<PaymentMethod/>} />
            <Route path="/admin-login" element={<AdminLogin/>} />
            <Route path="/new-message" element={<NewMessageForm/>} />
            <Route path="/sent" element={<Sent/>} />
            <Route path="/inbox" element={<Inbox/>} />
            <Route path="/account" element={<Account />} />
            <Route path="/bidding/:productId" element={<AddBids />} />

            <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
            <Route path="overview" element={<AdminOverview />} />
            <Route path="report" element={<ManageReports />} />
            
            {/* <Route path="/ceramics" element={<Ceramics />} /> */}


            </Route>


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
            <Route path='/seller/*' element={<SellerLayout />} > 
              <Route path='overview' element={<SellerOverview />} />
              <Route path="products" exact element={<Products />} />
              <Route path="activeproducts" element={<ActiveLists />} />
              <Route path="soldout" element={<SoldOutLists />} />
              <Route path="biddings" element={<Bidding />} /> 
              <Route path='comparebids/:productId' element={<CompareBids />} />
              <Route path="pendingbids" element={<Bidding />} /> 
              <Route path="orders" element={<SellerOrders />} />
              <Route path="orderdetail/:orderId" element={<SellerOrderDetail/>} />
              <Route path="sell" element={<AddNewProduct />} />
            </Route>
          </Routes>
        </div>
        </MessageProvider>
        </AuthProvider>
      </Router>


    


      
    );



}

export default App;
