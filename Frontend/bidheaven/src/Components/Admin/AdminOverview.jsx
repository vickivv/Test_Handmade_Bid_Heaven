import React, { useState, useEffect } from 'react';
import { Card, List, Divider } from 'antd';

const { Meta } = Card;

const Order: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // const admin_API_URL1 = `http://127.0.0.1:8000/api/admin_get_all_orders`;
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin_get_all_orders');
        if (!response.ok) {
          console.error(`HTTP Error Response: ${response.status} ${response.statusText}`);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setOrders(data); // 后端返回的数据，假设是订单数组
      } catch (error) {
        console.error("There was a problem with fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h5>Bidheaven Total Orders: {orders.length}</h5> {/* 显示订单总数 */}
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
        dataSource={orders}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 240 }}
            >
              <Meta title={item.ProductName} description={`Seller ID: ${item.SellerID} - Status: ${item.OrderStatus}`} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

const AdminOverview: React.FC = () => (
  <>
   
    <Order />
    {/* <Divider /> */}
  </>
);

export default AdminOverview;
