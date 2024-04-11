import React, { useState, useEffect } from 'react';
import { Card, Space, Button } from 'antd';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../Homepage/Header'
import Footer from '../Homepage/Footer'


const AddressBook = ({ onAddressSelect }) => {

const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
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

  const handleAddressClick = async (address) => {
    const userId = localStorage.getItem('userId');
    const setDefaultAddress = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/set_default_delivery?userId=${userId}&addressId=${address.AddressID}`, {
        method: 'PUT', // 明确指定使用 PUT 方法
      })
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    setDefaultAddress();
    navigate(-1);
  };

  return (
    <div>
    <Header />
    <div style={{ margin: '50px' }}>
    <h3>All Addresses</h3>
    {addresses.map((address) => (
       <Card title={`${address.Fname} ${address.Lname}`} size="small" onClick={() => handleAddressClick(address)}>
         <p>{address.Street}, {address.City}, {address.State}, {address.Zipcode}</p>
         <Button  >Deliver to this address</Button>
       </Card>
      ))}
    <div style={{marginTop: '30px', }}>
    <Link to={`/add_address`} style={{ textDecoration: 'underline', color: '#50123c' }}>Add a new Delivery Address</Link>
    </div>
    </div>
    <Footer />
    </div>
  );
};
export default AddressBook;
