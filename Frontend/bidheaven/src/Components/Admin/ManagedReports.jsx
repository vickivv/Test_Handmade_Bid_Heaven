import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Divider } from 'antd';
// import './ManageReports.css';

const { Meta } = Card;

// 后端API地址
const API_URL1 = `http://127.0.0.1:8000/api/get_overview_order`
const API_URL2 = `http://127.0.0.1:8000/api/get_overview_bid`

const Order: React.FC = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL1);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data); // 后端返回的data
      } catch (error) {
        console.error("There was a problem with fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={item.ProductName} src={item.Picture} className="custom-card-cover" />}
          >
          <Link to={`/buyer/order/${item.OrderID}`} style={{ textDecoration: 'none' }}>
            <Meta title={item.ProductName} description={item.OrderStatus} />
          </Link>
          </Card>
        </List.Item>
      )}
    />
  );
};

const Bid: React.FC = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL2);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("There was a problem with fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={item.Name} src="https://www.jellycat.com/images/products/large/BB4BBC.jpg" />}
          >
          <Link to={`/buyer/bid/${item.BiddingID}`} style={{ textDecoration: 'none' }}>
            <Meta title={item.Name} description={item.Status} />
          </Link>
          </Card>
        </List.Item>
      )}
    />
  );
};

const ManageReports: React.FC = () => (
  <>
    <h5>Recent Orders</h5>
    <Order />
    <Divider />
    <h5>Recent Bids</h5>
    <Bid />
  </>
);

export default ManageReports;