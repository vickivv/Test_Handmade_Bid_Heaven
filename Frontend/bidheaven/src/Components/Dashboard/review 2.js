import { Rate, Input, Button, Modal } from 'antd';
import React, { useState } from 'react';
import './review.css'

const { TextArea } = Input;
const Text = () => (
    <TextArea rows={4} placeholder="Write your words to the seller here!" maxLength={6} />
);

const Review = () => {
  const [modal2Open, setModal2Open] = useState(false);

  const showModal = (event) => {
    event.preventDefault(); // 阻止链接的默认行为
    setModal2Open(true); // 显示模态框
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
          onClick={() => setModal2Open(false)}
        >
          OK
        </Button>,
      ]}
    >
        <Rate />
        <br />
        <br />
        <Text />
      </Modal>
    </>
  );
};

export default Review;






