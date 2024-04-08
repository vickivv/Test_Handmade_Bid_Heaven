import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Image } from 'antd';
import './OrderDetail.css';
import {http} from '../utils/http';

const ip = 'http://localhost:8000/media/';

const cardStyle = {
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: 'min-height', 
  margin: '10px',
  padding: '5px'
};

const colStyleBase = {
  display: 'flex',
  flexDirection: 'column', 
  justifyContent: 'center', 
  textAlign: 'left'
};

const col20Style = {
  ...colStyleBase,
  flexBasis: '20%', 
};

const col80Style = {
  ...colStyleBase,
  flexBasis: '80%', 
};

const col60Style = {
  ...colStyleBase,
  flexBasis: '60%', 
};


export const SellerOrderDetail = () => {
  const { orderId } = useParams(); 

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await http.get(`/orderdetail/${orderId}`, {mode:'cors'});
        console.log(response.data)
        setOrderDetails(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderDetails) return <div>No order details found</div>;

  const addShipment =() => {
    console.log('shipment');
  }
  return (
  <>
  <div style={cardStyle}>
    <div style={col20Style}>Order Info</div>
    <div style={col80Style}>
      <p>OrderID: {orderDetails.orderid}</p>
      <p>Buyer: {orderDetails.buyerid}</p>
      <p>Order Date: {orderDetails.orderDate}</p>
      <p>Quantity: {orderDetails.quantity}</p>
      <p>Total Amount: US${orderDetails.totalAmount}</p>
    </div>
  </div>
  <Divider />
    <div style={cardStyle}>
      <div style={col20Style}>Payment</div>
        <div style={col80Style}>
          <p>Payment Status: {orderDetails.paymentStatus}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
        </div>
      </div>
  <Divider />
  <div style={cardStyle}>
    <div style={col20Style}>Item Info</div>
    <div style={col80Style}>
    <div style={{...cardStyle, margin: '0px', padding: '0px'}}>
        <div style={{...col20Style}}>
        <Image src={`${ip}${orderDetails.picture}`}/>
        </div>
      <div style={{...col60Style, padding: '20px'}}>
        <p>{orderDetails.productName}</p>
        <p>ProductID: {orderDetails.productid}</p>
        <p>Category: {orderDetails.category}</p>
      </div>
      <div style={col20Style}>Start Price: ${orderDetails.startPrice}</div>
    </div>
  </div>
  </div>
</>

  )
};
