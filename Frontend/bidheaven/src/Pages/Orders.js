import React, { useState, useEffect } from 'react';
import OrderItem from '../Components/Dashboard/orderitem';
import CustomSidebar from '../Components/Dashboard/sidebar';
import Filter from '../Components/Dashboard/filter'
import Header from '../Components/Homepage/Header';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Content, Sider } = Layout;

const Orders = () => {
  const userId = localStorage.getItem('userId');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedStatus, setSelectedStatus] = useState('All Orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const statusQuery = selectedStatus !== 'All Orders' ? `&status=${encodeURIComponent(selectedStatus)}` : '';
  fetch(`http://127.0.0.1:8000/api/get_all_orders?userId=${userId}${statusQuery}`)
    .then((response) => response.json())
    .then((data) => {console.log(data); setOrders(data)})
    .catch((error) => console.error('Error fetching data:', error));
}, [selectedStatus]);



  return (

  <div>
            <Filter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <OrderItem products={orders}/>
          </Content>
          </div>
  );
};
export default Orders;