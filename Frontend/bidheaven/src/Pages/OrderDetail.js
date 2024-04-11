import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Divider } from 'antd';
import { Image } from "antd";
import './OrderDetail.css'
import Timeline from '../Components/Dashboard/timeline';

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


const OrderDetail = () => {
  const { orderId } = useParams(); // 从 URL 中获取 orderId
  const location = useLocation(); // 正确的 useLocation 调用位置

  const [orderDetails, setOrderDetails] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_all_orders/${orderId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrderDetails(data.order_details[0]);
        setShipmentDetails(data.shipment_details[0])
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
    <div style={col20Style}>Order Info</div>
    <div style={col80Style}>
      <p>OrderID: {orderDetails.OrderID}</p>
      <p>Sold by {orderDetails.SellerID}</p>
      <p>Time Placed: {orderDetails.OrderDate}</p>
      <p>Total: US${orderDetails.TotalAmount}</p>
    </div>
  </div>
  <Divider />
  <div style={cardStyle}>
    <div style={col20Style}>Delivery Info</div>
    <div style={col80Style}>
      <Timeline status={shipmentDetails ? shipmentDetails.Status : 'null'} />
      <p>Tracking Number: {shipmentDetails ? shipmentDetails.TrackingNumber : 'Not available'}</p>
    </div>
  </div>
  <Divider />
  <div style={cardStyle}>
    <div style={col20Style}>Item Info</div>
    <div style={col80Style}>
    <div style={{...cardStyle, margin: '0px', padding: '0px'}}>
        <div style={{...col20Style}}>
        <img style={{maxWidth: '150px', maxHeight: '150px'}} alt={orderDetails.ProductName} src={orderDetails.Picture}/>
        </div>
      <div style={{...col60Style, padding: '20px'}}>
        <p>{orderDetails.ProductName}</p>
        <p>ProductID: {orderDetails.ProductID}</p>
      </div>
      <div style={col20Style}>${orderDetails.SellingPrice}</div>
    </div>
  </div>
  </div>
</>

  )
};

export default OrderDetail;