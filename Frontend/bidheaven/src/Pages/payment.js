import React, { useState, useEffect } from 'react';
import { Divider, Button, Modal, Space } from 'antd';
import AddAddress from '../Components/Dashboard/AddAddress';
import { useParams, Link, useNavigate, useRouteMatch, } from 'react-router-dom';
import AddressBook from '../Components/Users/AddressBook'
import Header from '../Components/Homepage/Header'
import Footer from '../Components/Homepage/Footer'
import '../Styles/payment.css'
import { ExclamationCircleFilled } from '@ant-design/icons';


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


const Items = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { confirm } = Modal;
  const navigate = useNavigate();

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

    const showDeleteConfirm = () => {
        const handleCancel = async (event) => {
          const dataToSend = {
              orderid: orderId,
            };
            try {
            const response = await fetch(`http://127.0.0.1:8000/api/cancel_order`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
              const result = await response.json();
              console.log('Success:', result);
            } else {
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
            };
      confirm({
        title: 'Are you sure cancel this order?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleCancel();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
};


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderDetails) return <div>No order details found</div>;


  return (
  <>
  <div>
    <div>
    <div style={{...cardStyle, margin: '0px', padding: '0px'}}>
        <div style={{...col20Style}}>
        <img style={{maxWidth: '200px', maxHeight: '200px'}} alt={orderDetails.ProductName} src={orderDetails.Picture}/>
        </div>
      <div style={{...col80Style, padding: '20px', paddingLeft: '5px'}}>
        <p>{orderDetails.ProductName}</p>
        <p>OrderID: {orderDetails.OrderID}</p>
        <p>Items: ${orderDetails.TotalAmount}</p>
        <p>Estimated tax to be collected: ${(orderDetails.TotalAmount * 0.1).toFixed(2)}</p>
        <h5>Total: ${orderDetails.TotalAmount + orderDetails.TotalAmount*0.1}</h5>

        <Space wrap>
    <Button onClick={showDeleteConfirm} key="submit"
          type="primary" style={{maxWidth: '200px'}}>
      Cancel Order
    </Button>
  </Space>

      </div>
      </div>
      <div>

    </div>
  </div>
  </div>
</>

)
};


const Delivery = ({ onDeliveryUpdate }) => {
    const userId = localStorage.getItem('userId');

    const [delivery, setDelivery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddressChangeClick = () => {
        navigate('/addressbook'); // 确保这个路径与您的路由设置匹配
    };

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
  if (!delivery) return (
  <div>
  <AddAddress/>
  </div>
  );

  return (
  <>
  <div>{delivery.Fname} {delivery.Lname}, {delivery.Street} {delivery.StreetOptional}, {delivery.City}, {delivery.State}, {delivery.Zipcode}</div>
  <div onClick={handleAddressChangeClick} style={{ textDecoration: 'underline', color: '#50123c' }}>
        Change Delivery Address
  </div>  </>
  );

}


const Payment = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { orderId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault(); // 阻止表单默认提交行为
      const dataToSend = {
          userid: userId,
          orderid: orderId,
          paymentmethod: 'E-Wallet',
        };
      try {
        const response = await fetch('http://127.0.0.1:8000/api/set_order', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend), // 将输入数据作为请求体发送
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result);
          navigate('/thankyou');
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
  <>
  <Header />
    <div style={{ padding: '50px' }}>
      <h4>Place your order</h4>
      <Items orderId={orderId} />
      <Divider />
      <h4>Delivering to</h4>
      <Delivery  />
      <Divider />
      <h4>Payment info</h4>
      <Divider />
      <div  style={{...colStyleBase, flexBasis: '50%'}}>
      <Button key="submit"
          type="primary"
          onClick={handleSubmit}>Confirm</Button>
      </div>
    </div>
  <Footer />
  </>
  );
};

export default Payment;