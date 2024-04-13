
import AdminOverview from '../Admin/AdminOverview';
// import ManageSoldOutLists from '../Admin/ManageSoldOutLists';

// 在AdminDashboard.jsx中
import { Outlet } from 'react-router-dom';
import React, { useState, useEffect,useContext } from 'react';
import { Layout ,theme,menu} from 'antd';
import AdminSidebar from "../Admin/AdminSidebar";
import Header from "../Homepage/Header";
import Footer from "../Homepage/Footer";

const { Content, Sider } = Layout;


const AdminDashboard = () => {
  // 使用状态跟踪当前选中的菜单项
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const [selectedStatus, setSelectedStatus] = useState('All Orders');
const [selectedMenu, setSelectedMenu] = useState('overview');
  const [orders, setOrders] = useState([]);
  const handleMenuSelect = (key) => {
    setSelectedMenu(key);
  };
  
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
            background: 'white'
          }}
        >
          <AdminSidebar onMenuSelect={handleMenuSelect} />

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

export default AdminDashboard;
