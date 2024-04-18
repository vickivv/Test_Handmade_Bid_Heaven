import React, { useState, useEffect } from 'react';
import { Card, List, Image } from 'antd';

const { Meta } = Card;

// Backend API URL
const API_URL = `http://127.0.0.1:8000/api/admin_get_all_orders`; // Use a clear and proper variable name for the API URL

const ip = 'http://localhost:8000/media/'; // Correct base path for media

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState([]); // Rename data to orders for clarity

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const ordersData = await response.json();
        setOrders(ordersData); // Set the fetched data directly to orders
      } catch (error) {
        console.error("There was a problem with fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
        dataSource={orders} // Make sure to use orders which is the state variable we are modifying
        renderItem={(order) => ( // Rename item to order to match the context of each rendered item
          <List.Item>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<Image alt="Product" src={`${ip}${order.Picture}`} />}
            >
              <Meta title={order.ProductName} description={`Seller ID: ${order.SellerID} - Status: ${order.OrderStatus}`} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

const ManageReports: React.FC = () => (
  <>
    <h5>All Orders</h5>
    <OrderList /> {/* Rename Order to OrderList to match the component definition */}
  </>
);

export default ManageReports;
