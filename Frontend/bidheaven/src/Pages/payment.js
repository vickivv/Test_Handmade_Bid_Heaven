import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import Address from '../Components/Dashboard/Address';
import { useParams } from 'react-router-dom';


const cardStyle = {
  display: 'flex',
  flexDirection: 'row', // Align children in a row
  justifyContent: 'center', // Center children horizontally
  alignItems: 'center', // Center children vertically
  height: 'min-height', // Set a fixed height, or use min-height to be responsive
  margin: '10px', // Center the card itself
  padding: '5px'
};

const colStyleBase = {
  display: 'flex',
  flexDirection: 'column', // Stack column content vertically
  justifyContent: 'center', // Center column content vertically
  textAlign: 'left'
   // Center column content horizontally (for col-20-right)
  // Common column styles...
};

const col20Style = {
  ...colStyleBase,
  flexBasis: '20%', // 20% of the card's width
  // Additional specific styles for the first column...
};

const col80Style = {
  ...colStyleBase,
  flexBasis: '80%', // 60% of the card's width
  // Additional specific styles for the middle column...
};

const col60Style = {
  ...colStyleBase,
  flexBasis: '60%', // 60% of the card's width
  // Additional specific styles for the middle column...
};


const Items = () => {
  const { orderId } = useParams(); // 从 URL 中获取 orderId

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_payment_item/${orderId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrderDetails(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]); // 依赖项数组中包含 orderId，这样当 orderId 变化时，useEffect 会重新运行

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderDetails) return <div>No order details found</div>;


  return (
  <>

  <div style={cardStyle}>
    <div style={col80Style}>
    <div style={{...cardStyle, margin: '0px', padding: '0px'}}>
        <div style={{...col20Style}}>
        <img style={{maxWidth: '250px', maxHeight: '250px'}} alt={orderDetails.ProductName} src={orderDetails.Picture}/>
        </div>
      <div style={{...col60Style, padding: '20px'}}>
        <p>{orderDetails.ProductName}</p>
        <p>ProductID: {orderDetails.ProductID}</p>
        <p>OrderID: {orderDetails.OrderID}</p>
        <p>Sold by Seller{orderDetails.SellerID}</p>
        <p>Time Placed: {orderDetails.OrderDate}</p>
        <p>Total: US${orderDetails.TotalAmount}</p>
        <a href="#" style={{ display: 'block' }}>View Item</a>
      </div>
      <div style={col20Style}>${orderDetails.SellingPrice}</div>
    </div>
  </div>
  </div>
</>

)
};


const Delivery = () => {
    const userId = localStorage.getItem('userId');

    const [delivery, setDelivery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchDelivery = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_default_delivery?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDelivery(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDelivery();
  }, [userId]); // 依赖项数组中包含 orderId，这样当 orderId 变化时，useEffect 会重新运行

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!delivery) return <div>No delivery information found</div>;

}



const Payment = () => (
  <div style={{padding: '50px'}}>
    <h4>Items</h4>
    <Items />
    <Divider />
    <h4>Delivery info</h4>
    <Delivery />
    <Divider />
    <h4>Payment info</h4>
  </div >
);
export default Payment;