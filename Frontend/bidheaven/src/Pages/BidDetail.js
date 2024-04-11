import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Divider, Button, Image, Modal } from 'antd';
import './OrderDetail.css'
import Countdown from '../Components/Dashboard/countdown'


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


const BidDetail = () => {
  const { BiddingID } = useParams(); // 从 URL 中获取 orderId
  const location = useLocation(); // 正确的 useLocation 调用位置
  const navigate = useNavigate();

  const [bidDetails, setBidDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBidDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_all_bids/${BiddingID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBidDetails(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBidDetails();
  }, [BiddingID]); // 依赖项数组中包含 orderId，这样当 orderId 变化时，useEffect 会重新运行

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bidDetails) return <div>No order details found</div>;

  const CancelModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (event) => {
      event.preventDefault(); // 阻止表单默认提交行为
      const dataToSend = {
          biddingid: bidDetails.BiddingID,
        };
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cancel_bid', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend), // 将输入数据作为请求体发送
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
  setIsModalOpen(false);
  navigate('/buyer/bid')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Cancel this bid
      </Button>
      <Modal title="Are you sure to cancel this bid?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
    </>
  );
};


  return (
  <>
  <div style={cardStyle}>
    <div style={col20Style}>Bidding Info</div>
    <div style={col60Style}>
      <p>BiddingID: {bidDetails.BiddingID}</p>
      <p>Sold by Seller{bidDetails.SellerID}</p>
      <p>Time Placed: {bidDetails.BidDate}</p>
      <p>Bid Price: US${bidDetails.BidPrice}</p>
      <p>Quantity: {bidDetails.Quantity}</p>
      <p>Total: US${bidDetails.TotalAmount}</p>
    </div>
    <div style={col20Style}>
      {bidDetails.Status === 'Pending' && <CancelModal />}
    </div>
  </div>
  <Divider />
  <div style={cardStyle}>
    <div style={col20Style}>Bidding Status</div>
    <div style={col80Style}>
      <p>Status: {bidDetails.Status}</p>
      {bidDetails.Status === 'Pending' && <Countdown BidDate={bidDetails.BidDate} ActiveDays={bidDetails.ActiveDays}/>}
    </div>
  </div>
  <Divider />
  <div style={cardStyle}>
    <div style={col20Style}>Item Info</div>
    <div style={col80Style}>
    <div style={{...cardStyle, margin: '0px', padding: '0px'}}>
        <div style={{...col20Style}}>
        <img style={{maxWidth: '150px', maxHeight: '150px'}} alt={bidDetails.Name} src={bidDetails.Picture}/>
        </div>
      <div style={{...col60Style, padding: '20px'}}>
        <p>{bidDetails.Name}</p>
        <p>ProductID: {bidDetails.ProductID}</p>
      </div>
      <div style={col20Style}>Start Price: ${bidDetails.StartPrice}</div>
    </div>
  </div>
  </div>
</>

  )
};

export default BidDetail;