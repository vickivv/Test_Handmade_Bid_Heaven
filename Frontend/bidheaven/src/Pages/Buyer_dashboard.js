import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import OrderItem from '../Components/Dashboard/orderitem';
import CustomSidebar from '../Components/Dashboard/sidebar';
import Filter from '../Components/Dashboard/filter'
import Header from '../Components/Homepage/Header';
import Footer from '../Components/Homepage/Footer'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Content, Sider } = Layout;

const BuyerDashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedStatus, setSelectedStatus] = useState('All Orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const statusQuery = selectedStatus !== 'All Orders' ? `?status=${encodeURIComponent(selectedStatus)}` : '';
  fetch(`http://127.0.0.1:8000/api/get_all_orders${statusQuery}`) // Use backticks here
    .then((response) => response.json())
    .then((data) => setOrders(data))
    .catch((error) => console.error('Error fetching data:', error));
}, [selectedStatus]);

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Layout>
        <Sider
          width={256}
          style={{
            background: colorBgContainer,
          }}
        >
          <CustomSidebar />
        </Sider>
        <Layout
          style={{
            padding: '24px 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};
export default BuyerDashboard;