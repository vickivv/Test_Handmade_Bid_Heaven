import { Divider, Image, Card, Breadcrumb, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {http} from '../utils/http';

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
  
export const CompareBids = () => {
    const { productId } = useParams(); 
    const [bidData, setBidData] = useState([]);
    const [productData, setProductData] = useState([]);
    
    const loadBid = async () => {
        const res = await http.get(`/productbids/${productId}/`, {mode:'cors'});
        setBidData(res.data.result);
    };

    const loadProduct = async() => {
        const res = await http.get(`/getproducts/${productId}/`, {mode:'cors'});
        setProductData(res.data);
        console.log(res.data.cover);
    }
    useEffect(() => {
        loadBid();
        loadProduct();
        
    }, [])

    const columns = [
        {
          title: 'Bidding ID',
          dataIndex: 'biddingid',
          width: 220
        },
        {
          title: 'Bid Price',
          dataIndex: 'bidPrice',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity'
        },
        {
          title: 'Bid Date',
          dataIndex: 'bidDate'
        },
        {
          title: 'Bidder Name',
          dataIndex: 'bidderName'
        },
        {
          title: 'Bidder Rate',
          dataIndex: 'bidderRate'
        },
        {
            title: 'Valid Until',
            dataIndex: 'validDate'
          }
      ]

    return (
        <>
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/overview">Seller's Page</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/biddings">My Biddings</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Compare Bids</Breadcrumb.Item>
            </Breadcrumb>
          }
          style={{ marginBottom: 20 }}
        ></Card>
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
        <Divider />
        <Card title={`Biddings on Product ${productId}`}> 
          <Table
            rowKey="id"
            columns={columns}
            dataSource={bidData} 
            bordered
          />
        </Card>
      </>
    )      
}