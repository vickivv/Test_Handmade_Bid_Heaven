import { Card, Space, Col, Row, Button, Tooltip, Modal, Rate, List, Input } from 'antd';
import { useState, useEffect } from 'react';
import { MoreOutlined, StarOutlined, CommentOutlined, TruckOutlined } from '@ant-design/icons';
import {useNavigate, Link} from 'react-router-dom';
import {http} from "../utils/http";

const ip = 'http://localhost:8000/media/';

export const SellerOrders = () => {
    const userId = localStorage.getItem('userId');
    // to add a search bar
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        const res = await http.get(`/getorders/${userId}/`, {mode:'cors'});
        setOrders(res.data.result);
    }
    useEffect(()=>{
        fetchOrders();
    },[]);

    const [value, setValue] = useState(2.5);
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);
    const [rateData, setRateData] = useState(null)
    const showRateModal = (data) => {
      setRateData(data);
      setIsRateModalOpen(true);
    };

    const handleRateOk = async (data) => {
      const {orderid, buyerid, productid} = data
      const formData = new FormData();
      formData.append("orderid", orderid);
      formData.append("rate", value);
      formData.append("buyerid", buyerid);
      formData.append("productid", productid);
      formData.append("userId", userId);
      await http.post('/addrate', formData);
      setIsRateModalOpen(false);
    };
    const handleRateCancel = () => {
      setIsRateModalOpen(false);
    };

    const navigate = useNavigate()
    const getdetails = (data) =>{
        navigate(`/seller/orderdetail/${data.orderid}`);
    }

    const [track, setTrack] = useState("");
    const [isShipModalOpen, setIsShipModalOpen] = useState(false);
    const [shipData, setShipData] = useState(null)
    const showShipModal = (data) => {
      setShipData(data)
      setIsShipModalOpen(true);
    };

    const handleGetInputValue = (event) => {
      setTrack(event.target.value);
    }

    const handleShipOk = async (data) => {
      const {orderid, buyerid} = data
      const formData = new FormData();
      formData.append("orderid", orderid);
      formData.append("buyerid", buyerid);
      formData.append("track", track);
      await http.post('/addshipment', formData);
      setIsShipModalOpen(false);
    };
    const handleShipCancel = () => {
      setIsShipModalOpen(false);
    };

    return (
      <List
        dataSource={orders}
        renderItem={(item) => (
          <List.Item>
            <Space direction="vertical" size={16} style={{width: '100%'}}>
              <Card>
                <Row gutter={16}>
                  <Col span={4} >
                    <img src={`${ip}${item.picture}`} style={{height: '100px', width: '100px'}} />
                  </Col>
                  <Col span={6}>
                    <div style={{fontSize: '20px'}} >{}</div>
                    <div >{`Order ID: ${item.orderid}`}</div>
                    <div >{`Order Status: ${item.orderStatus}`}</div>
                    <div>{`Order Date: ${item.orderDate}`}</div>
                  </Col>
                  <Col span={6}>
                    <div style={{height: '100px', lineHeight: '100px', fontSize: '20px'}}>{`\$${item.amount}`}</div>
                  </Col>
                <Col span={6} push={2} >
                  <Space size="middle">
                    <Tooltip title="Order Details">
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<MoreOutlined />}
                        style={{marginTop: '30px'}}
                        onClick={() => getdetails(item)}
                      />
                    </Tooltip>
                    <Tooltip title="Review Buyer">
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<StarOutlined />}
                        style={{marginTop: '30px'}}
                        onClick={()=>showRateModal(item)}
                      />
                    </Tooltip>
                    <Modal title="Please rate buyer" open={isRateModalOpen} onOk={()=>handleRateOk(rateData)} onCancel={handleRateCancel}>
                      <Rate allowHalf defaultValue={2.5} onChange={setValue} value={value} />
                    </Modal>
                    <Tooltip title="Contact">
                    <Link to="/new-message" state={{bidderemail: item.buyeremail}}>
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<CommentOutlined />}
                        style={{marginTop: '30px'}}
                      />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Shipment">
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<TruckOutlined />}
                        style={{marginTop: '30px'}}
                        onClick={()=>showShipModal(item)}
                      />
                    </Tooltip>
                    <Modal title="Please add tracking number" open={isShipModalOpen} onOk={()=>handleShipOk(shipData)} onCancel={handleShipCancel}>
                      <Input placeholder="Tracking number..." defaultValue='' value={track} onChange={handleGetInputValue}/>
                    </Modal>
                  </Space>
                 </Col>
              </Row>
          </Card>
        </Space>
      </List.Item> 
      )}
    />      
    );
}