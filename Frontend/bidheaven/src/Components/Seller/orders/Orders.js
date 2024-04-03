import { Card, Space, Col, Row, Button, Tooltip, Modal, Rate, List } from 'antd';
import { useState, useEffect } from 'react';
import { MoreOutlined, StarOutlined, CommentOutlined, TruckOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {http} from "../utils/http";

const ip = 'http://localhost:8000/media/';

export const Orders = () => {

    // to add a search bar
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        const res = await http.get('/getorders');
        setOrders(res.data.result)
    }
    useEffect(()=>{
        fetchOrders();
    },[]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const navigate = useNavigate()
    const getdetails = (data) =>{
        navigate(`/orderdetail/${data.orderid}`);
    }

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
                        onClick={showModal}
                      />
                    </Tooltip>
                    <Modal title="Please rate buyer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <Rate allowHalf defaultValue={2.5} />
                    </Modal>
                    <Tooltip title="Contact">
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<CommentOutlined />}
                        style={{marginTop: '30px'}}
                      />
                    </Tooltip>
                    <Tooltip title="Shipment">
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<TruckOutlined />}
                        style={{marginTop: '30px'}}
                      />
                    </Tooltip>
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