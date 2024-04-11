import React, { useState, useEffect }from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, Modal, Divider, Card, message, Avatar, List, Form } from 'antd';
import Header from '../Homepage/Header'
import Footer from '../Homepage/Footer'
import '../../Styles/Account.css'
import './AddressBook.css'

const AccountDetail = () => {
    const [details, setDetails] = useState({ user_details: [], baseuser_details: [] });
    const location = useLocation();

    useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_account_detail?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetails(data); // 假设响应的结构是 { user_details: [], baseuser_details: [] }
        console.log(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchDetails();
  }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

  const [phoneValue, setPhoneValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const handlePhoneChange = (e) => {
        setPhoneValue(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsernameValue(e.target.value);
    };

  const handleSubmit = async (event) => {
      const userId = localStorage.getItem('userId');

      const dataToSend = {
          userid: userId,
          username: usernameValue,
          phone: phoneValue,
        };
      try {
        const response = await fetch('http://127.0.0.1:8000/api/set_account_detail', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend), // 将输入数据作为请求体发送
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result);
          setDetails(prevDetails => {
            const updatedUserDetails = prevDetails.user_details.map(detail => {
                if (detail.UserID.toString() === userId) {
                    return { ...detail, Username: usernameValue, Phone: phoneValue };
                }
                return detail;
            });

            return {
                ...prevDetails,
                user_details: updatedUserDetails,
            };
        });
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  setIsModalOpen(false);
  };

    return (
    <div >
    {details.baseuser_details.map((detail, index) => (
        <div key={index} style={{ marginLeft:'60px', marginTop:'20px'}}>
          <p><strong>First name</strong>: {detail.Fname}</p>
          <p><strong>Last name</strong>: {detail.Lname}</p>
          <p><strong>Email</strong>: {detail.Email}</p>
        </div>
      ))}
      {details.user_details.map((detail, index) => (
        <div key={index} style={{ marginLeft:'60px'}}>
          <p><strong>Phone</strong>: {detail.Phone}</p>
          <p><strong>Username</strong>: {detail.Username}</p>
          <p><strong>Rate</strong>: {detail.Rate}</p>
        </div>
      ))}
      <Button onClick={showModal} style={{ marginLeft: '60px' }}>Edit</Button>
        <Modal title="Update Account Details" open={isModalOpen} onCancel={handleCancel} footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button key="submit" type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item label="Phone">
                    <Input placeholder="Input your new phone number" value={phoneValue} onChange={handlePhoneChange} />
                </Form.Item>
                <Form.Item label="Username">
                    <Input placeholder="Input your new username" value={usernameValue} onChange={handleUsernameChange} />
                </Form.Item>
            </Form>
        </Modal>
    </div>
  );
};

const Addresses = ({ onAddressSelect }) => {

  const [messageApi, contextHolder] = message.useMessage();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // 新增状态变量

  const [addresses, setAddresses] = useState([]);
  const location = useLocation();
  const { updateDeliveryAddress } = location.state || {};

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_all_addresses?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAddresses(data);
        console.log(data)
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    // 显示成功消息的副作用
    if (showSuccessMessage) {
      messageApi.open({
        type: 'success',
        content: 'Successfully set as default address',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      setShowSuccessMessage(false); // 重置状态
    }
  }, [showSuccessMessage, messageApi]);

  const handleAddressClick = async (address) => {

    const userId = localStorage.getItem('userId');
    try {
    const response = await fetch(`http://127.0.0.1:8000/api/set_default_delivery?userId=${userId}&addressId=${address.AddressID}`, {
      method: 'PUT', // 明确指定使用 PUT 方法
    });
    if (response.ok) {
      // 如果请求成功，则显示成功消息
      setShowSuccessMessage(true);
    } else {
      // 可以处理请求失败的情况
      console.error("Error setting default address");
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
  };

  return (
    <div>
    {contextHolder}
    <div style={{ margin: '50px', marginTop:'20px' }}>
    {addresses.map((address) => (
       <Card key={address.AddressID} title={`${address.Fname} ${address.Lname}`} size="small" onClick={() => handleAddressClick(address)}>
         <p>{address.Street}, {address.City}, {address.State}, {address.Zipcode}</p>
         <Button  >Set as default delivery address</Button>
       </Card>
      ))}
    <div style={{marginTop: '30px', }}>
    <Link to={`/add_address`} style={{ textDecoration: 'underline', color: '#50123c' }}>Add a new Delivery Address</Link>
    </div>
    </div>
    </div>
  );
};


// Assuming your component structure is like this:
const Account = () => {
    return (
        <div>
            <Header />
            <div>
                <div>
                    <h4 style={{marginTop:'20px'}}>Account details</h4>
                    <AccountDetail />
                </div>
                <Divider />
                <div className="address-book-container">
                    <h4>Address book</h4>
                    <Addresses />
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Account;