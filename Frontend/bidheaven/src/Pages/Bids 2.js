import React, { useState, useEffect } from 'react';
import BidItem from '../Components/Dashboard/biditem';
import CustomSidebar from '../Components/Dashboard/sidebar';
import BidFilter from '../Components/Dashboard/bidfilter'
import Header from '../Components/Homepage/Header';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Content, Sider } = Layout;

const Bids = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedStatus, setSelectedStatus] = useState('All Bids');
  const [bids, setBids] = useState([]);

  useEffect(() => {
  const statusQuery = selectedStatus !== 'All Bids' ? `?status=${encodeURIComponent(selectedStatus)}` : '';
  fetch(`http://127.0.0.1:8000/api/get_all_bids${statusQuery}`) // Use backticks here
    .then((response) => response.json())
    .then((data) => setBids(data))
    .catch((error) => console.error('Error fetching data:', error));
}, [selectedStatus]);



  return (
  <div>
            <BidFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <BidItem bids={bids}/>
          </Content>
          </div>
  );
};
export default Bids;