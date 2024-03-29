import React from 'react';
import { Card, Space, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";

import "../../../Styles/SellerPages.css"


export const Overview = () => {
    const navigate = useNavigate();

    
    const goAllLists = () => {
        navigate('/products');
    };

    const goActiveLists = () => {
        navigate('/activeproducts');
    };

    const goSoldOutLists = () => {
        navigate('/soldout');
    };

    const goTotalOrders = () => {
        navigate('/orders');
    }

    // add data fetching logic after building backend
    return (
        <Space direction="vertical" size={16}>
        <Card>
            <Row gutter={16}>
                <Col span={6}>
                    <div style={{fontSize: '30px'}}>{0}</div>
                    <button className="details" onClick={goAllLists}>All Products</button> 
                </Col>
                <Col span={6}>
                    <div style={{fontSize: '30px'}}>{0}</div>
                    <button className="details" onClick={goActiveLists}>Active Products</button>
                </Col>
                <Col span={6}>
                    <div style={{fontSize: '30px'}}>{0}</div>
                    <button className="details" onClick={goSoldOutLists}>Sold Out Products</button>
                 </Col>
                 <Col span={6}>
                    <div style={{fontSize: '30px'}}>{0}</div>
                    <button className="details" onClick={goTotalOrders}>Total Orders</button>
                 </Col>
            </Row>
            </Card>
            </Space>

    )
};
