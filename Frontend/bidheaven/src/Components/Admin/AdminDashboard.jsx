
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


// const AdminDashboard = () => {
//   // 使用状态跟踪当前选中的菜单项
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

// const [selectedStatus, setSelectedStatus] = useState('All Orders');
// const [selectedMenu, setSelectedMenu] = useState('overview');
  // const [orders, setOrders] = useState([]);
//   const handleMenuSelect = (key) => {
//     setSelectedMenu(key);
//   };
  
//   // useEffect(() => {
//   //   // 构建状态查询字符串
//   //   const statusQuery = selectedStatus !== 'All Orders' ? `?status=${encodeURIComponent(selectedStatus)}` : '';
  
//   //   // 发起请求到后端API，携带可能的状态参数
//   //   fetch(`http://127.0.0.1:8000/api/admin_get_all_orders`)
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error, status = ${response.status}`);
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       setOrders(data);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // }, [selectedStatus]);
  


  // return (
  //   <Layout>
  //     <Header
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //       }}
  //     />
  //     <Layout>
  //       <Sider
  //         width={256}
  //         style={{
  //           background: 'white'
  //         }}
  //       >
  //         <AdminSidebar onMenuSelect={handleMenuSelect} />

  //       </Sider>
  //       <Layout
  //         style={{
  //           padding: '24px 24px 24px',
  //         }}
  //       >
  //         <Content
  //           style={{
  //             padding: 24,
  //             margin: 0,
  //             minHeight: 280,
  //             background: colorBgContainer,
  //             borderRadius: borderRadiusLG,
  //           }}
  //         >
  //         <Outlet />
  //         </Content>
  //       </Layout>
  //     </Layout>
  //     <Footer />
  //   </Layout>
  // );



  
// };

// export default AdminDashboard;


const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const handleMenuSelect = async (key) => {
    setSelectedMenu(key);
    if (key === 'allOrders') {  // 假设有一个菜单项用于显示所有订单
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin_get_all_orders');
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default AdminDashboard;
