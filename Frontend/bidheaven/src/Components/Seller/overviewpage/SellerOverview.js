import React from 'react';
import { Card, Space, Col, Row, List, Divider, Button} from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {http} from '../utils/http'
import "./SellerPages.css"

const ip = 'http://localhost:8000/media/';

const Stats = () => {
    const [activeNum, setActiveNum] = useState(0);
    const [soldoutNum, setSoldoutNum] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
    const [avgBid, setAvgBid] = useState(0);

    useEffect(() => {
        const loadData = async () => {
          const userId = localStorage.getItem('userId');
          const res = await http.get(`/getstat/${userId}/`, {mode:'cors'});
          const { activeProduct, soldoutProduct, totalOrder, totalSale, averageBid } = res.data;
          setActiveNum(activeProduct);
          setSoldoutNum(soldoutProduct);
          setTotalOrder(totalOrder);
          setTotalSale(totalSale);
          setAvgBid(averageBid);
        }
        loadData()
    }, [])

    const navigate = useNavigate();


    const goActiveLists = () => {
        navigate('/seller/activeproducts');
    };

    const goSoldOutLists = () => {
        navigate('/seller/soldout');
    };

    const goTotalOrders = () => {
        navigate('/seller/orders');
    }

    // add data fetching logic after building backend
    return (
        <Space direction="vertical" size={16}>
        <Card>
            <Row gutter={16}>
                <Col span={4}>
                    <div style={{fontSize: '35px'}}>{activeNum}</div>
                    <Button className="details" onClick={goActiveLists} size='large'>Active Products</Button>
                </Col>
                <Col span={4}>
                    <div style={{fontSize: '35px'}}>{soldoutNum}</div>
                    <Button className="details" onClick={goSoldOutLists} size='large'>Sold Out Products</Button>
                 </Col>
                 <Col span={4}>
                    <div style={{fontSize: '35px'}}>{totalOrder}</div>
                    <Button className="details" onClick={goTotalOrders} size='large'>Total Orders</Button>
                 </Col>
                 <Col span={4}>
                    <div style={{fontSize: '35px'}}>{totalSale}</div>
                    <Button className="details" size='large'>Total Sale Amount</Button>
                 </Col>
                 <Col span={4}>
                    <div style={{fontSize: '35px'}}>{avgBid}</div>
                    <Button className="details" size='large'>Average Bid Price</Button>
                 </Col>
            </Row>
            </Card>
            </Space>
    )
};

const { Meta } = Card;

const Order = () => {
    const [orders, setOrders] = useState([]);
    const fetchOrders = async() => {
        const userId = localStorage.getItem('userId');
        const response = await http.get(`/getrecentorders/${userId}/`, {mode:'cors'});
        setOrders(response.data.result);
    };
    useEffect(() => {
        fetchOrders();
    },[])

    return (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={item.productName} src={`${ip}${item.picture}`} />}
              >
              <Link to={`/seller/orderdetail/${item.orderid}`} style={{ textDecoration: 'none' }}>
                <Meta title={item.productName} description={item.orderStatus} />
              </Link>
              </Card>
            </List.Item>
          )}
        />
      );
};

const Bid = () => {
    const [bids, setBids] = useState([])
    const fetchBids = async() => {
        const userId = localStorage.getItem('userId');
        const response = await http.get(`/getrecentbids/${userId}/`, {mode:'cors'});
        setBids(response.data.result);
    };
    useEffect(() => {
        fetchBids();
    },[]);

    return (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          dataSource={bids}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={item.productName} src={`${ip}${item.picture}`} />}
              >
              <Link to={`/seller/biddings`} style={{ textDecoration: 'none' }}>
                <Meta title={item.productName} description={ <span> ID:{item.bidid} <br /> Status:{item.bidStatus} </span>} />
              </Link>
              </Card>
            </List.Item>
          )}
        />
      );
};

export const SellerOverview = () => {
    const userId = localStorage.getItem('userId');
    const [username, setUsername] = useState();
    const fetchName = async () => {
      const response = await http.get(`/getusername/${userId}/`, {mode:'cors'});
        setUsername(response.data.result);
    };
    useEffect(() => {
        fetchName();
    },[]);
    return(
      <>
      <Card>
        <h5>Seller: {username}</h5>
        </Card>
        <Divider />
        <h5>Your Statistics</h5>
        <Stats />
        <Divider />
        <h5>Recent Orders</h5>
        <Order />
        <Divider />
        <h5>Recent Bids</h5>
        <Bid />
      </>
    )
};
