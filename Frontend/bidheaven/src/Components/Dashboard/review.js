import { Rate, Input, Button, Modal } from 'antd';
import React, { useState } from 'react';
import './review.css'

const { TextArea } = Input;
const Text = () => (
    <TextArea rows={4} placeholder="Write your words to the seller here!" maxLength={6} />
);

const Review = ({ sellerid, productid, orderid }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const userId = localStorage.getItem('userId');

  const showModal = (event) => {
    event.preventDefault(); // 阻止链接的默认行为
    setModal2Open(true); // 显示模态框
  };

  const handleRateChange = value => {
    setRateValue(value);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault(); // 阻止表单默认提交行为
      const dataToSend = {
          userid: userId,
          sellerid: sellerid,
          data: inputValue,
          productid: productid,
          orderid: orderid,
          rate: rateValue,
        };
      try {
        const response = await fetch('http://127.0.0.1:8000/api/insert_review', {
          method: 'POST',
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
  setModal2Open(false);
  };

  return (
    <>
      <a href="#!" className="review-link" onClick={showModal} style={{ color: '#50123c' }}>
        Review Your Seller
      </a>
      <Modal
      title="Rate your seller!"
      centered
      visible={modal2Open}
      onOk={() => setModal2Open(false)}
      onCancel={() => setModal2Open(false)}
      footer={[
        <Button key="back" onClick={() => setModal2Open(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
        >
          OK
        </Button>,
      ]}
    >
        <form onSubmit={handleSubmit}>
          <Rate onChange={handleRateChange} value={rateValue}/>
          <br /><br />
          <TextArea onChange={handleInputChange} value={inputValue}/>
          {/* 把这个提交按钮设为 type="submit"，但它实际上不会显示，因为您已经在模态的 footer 中定义了按钮 */}
          <button type="submit" style={{ display: 'none' }}>Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default Review;






