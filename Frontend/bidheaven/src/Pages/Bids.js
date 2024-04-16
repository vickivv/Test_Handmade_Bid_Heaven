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
  const ip = 'http://localhost:8000/media/';
  const userId = localStorage.getItem('userId');
  const statusQuery = selectedStatus !== 'All Bids' ? `&status=${encodeURIComponent(selectedStatus)}` : '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_all_bids?userId=${userId}${statusQuery}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const cleanedData = data.map(bid => ({
          ...bid,
          Picture: `${ip}${bid.Picture.replace(/\\/g, "").replace(/\"/g, '')}`
        }));
        setBids(cleanedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [userId, selectedStatus]);



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