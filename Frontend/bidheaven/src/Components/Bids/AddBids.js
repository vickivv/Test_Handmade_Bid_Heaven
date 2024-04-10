import { useNavigate, useParams } from 'react-router-dom';
import {http} from '../../Components/Seller/utils/http';
import { Card, Divider, Input, Form, Image, message, Space, Button } from 'antd';
import { useState, useEffect } from 'react';
const cardStyle = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 'min-height', 
    margin: '10px',
    padding: '5px'
};
  
const colStyleBase = {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center', 
    textAlign: 'left'
};
  
const col20Style = {
    ...colStyleBase,
    flexBasis: '20%', 
};
  
const col80Style = {
    ...colStyleBase,
    flexBasis: '80%', 
};
  
const col60Style = {
    ...colStyleBase,
    flexBasis: '60%', 
};

const ip = 'http://localhost:8000/media/';

export const AddBids = () => { 
  const { productId } = useParams();
  const userId = localStorage.getItem('userId');
  const ProductInfo = () => {
    const [productData, setProductData] = useState([]);
    const loadProduct = async() => {
        const res = await http.get(`/getproduct/${productId}/`, {mode:'cors'});
        setProductData(res.data);
        console.log(res.data.cover);
    }
    useEffect(() => {
        loadProduct(); 
    }, [])

    return (
        <Card>
        <div style={col20Style}>Product Info</div>
        <div style={col80Style}>
        <div style={{...cardStyle, margin: '0px', padding: '0px'}}>
            <div style={{...col20Style}}>
            <Image src={`${ip}${productData.cover}`}/>
            </div>
          <div style={{...col60Style, padding: '20px'}}>
            <p>ProductID: {productId}</p>
            <p>{`Category: ${productData.category}`}</p>
            <p>{`Inventory: ${productData.inventory}`}</p>
          </div>
          <div style={col20Style}>{`Start Price: ${productData.startPrice}`}</div>
        </div>
      </div>
      </Card>
    )
  }

  const BidInput = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
      const { bidprice, quantity, activedays} = values
      const formData = new FormData();
      formData.append("userid", userId);
      formData.append("productid", productId);
      formData.append("bidprice", bidprice);
      formData.append("quantity", quantity);
      formData.append("activedays", activedays);
      console.log(formData);
      await http.post(`/addbid`, formData);
    navigate('/buyer/bid');
    message.success('Bid Completed');
  }

  return (
    <Card>
    <Form
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 16 }}
    onFinish={onFinish}
  >
    <Form.Item
      label="Bid Price"
      name="bidprice"
      rules={[{ required: true, message: 'Please input bid price.' }]}
    >
      <Input placeholder="Bid price..." style={{ width: 400 }} />
    </Form.Item>
    <Form.Item
      label="Number of Product"
      name="quantity"
      rules={[{ required: true, message: 'Please input number of product you want to buy.' }]}
    >
      <Input placeholder="Number..." style={{ width: 400 }} />
    </Form.Item>
    <Form.Item
      label="Active Days"
      name="activedays"
      rules={[{ required: true, message: 'Please input active days of your bid.' }]}
    >
      <Input placeholder="Acrive days..." style={{ width: 400 }} />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </Card>
    )
  }

    return (
        <>
        <ProductInfo />
        <Divider />
        <BidInput />
        </>
    )
}