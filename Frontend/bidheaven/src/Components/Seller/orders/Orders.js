import { Card, Space, Col, Row, Button, Tooltip, Modal, Rate, Input } from 'antd';
import { useState } from 'react';
import flower3 from '../../../Assests/flower3.png';
import { MoreOutlined, StarOutlined, CommentOutlined, TruckOutlined } from '@ant-design/icons';
import {Link, Outlet} from 'react-router-dom';

export const Orders = () => {

    //加一个Searchbar
    //待加入获取和上传data的逻辑

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

    // 待修改成根据fetch到的列表内容循环构建card
    return (
        <Space direction="vertical" size={16} style={{width: '100%'}}>
        <Card>
        <Row gutter={16}>
                <Col span={4} >
                    <img src={flower3} style={{height: '100px', width: '100px'}} />
                </Col>
                <Col span={6}>
                    <div style={{fontSize: '20px'}} >{'Stained Glass Flowers'}</div>
                    <div >{'Order ID'}</div>
                    <div >{'Order status'}</div>
                    <div>{'Order date'}</div>
                </Col>
                <Col span={6}>
                    <div style={{height: '100px', lineHeight: '100px', fontSize: '20px'}}>{'$'}{60.0}</div>
                 </Col>
                    <Col span={6} push={2} >
                 
              <Space size="middle">
                <Tooltip title="Order Details">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<MoreOutlined />}
                    style={{marginTop: '30px'}}
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

    )
}