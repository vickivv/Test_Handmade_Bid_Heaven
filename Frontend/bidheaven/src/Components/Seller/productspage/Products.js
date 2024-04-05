import React from 'react';
import { Button, Card, List, Divider } from 'antd';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './products.css';
import {http} from '../../Seller/utils/http';

const ip = 'http://localhost:8000/media/';
const { Meta } = Card;

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async() => {
        const response = await http.get('/bestsaleproducts');
        setProducts(response.data.result);
    };
    useEffect(() => {
        fetchProducts();
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
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={item.productname} src={`${ip}${item.picture}`} />}
              >
                <Meta title={item.productname} description={<span>Category:{item.category}<br />Sales:{item.quantity} </span>} />
              </Card>
            </List.Item>
          )}
        />
      );
};

export const Products = () => {

    return (
    <div>
        <h5>Top Sold Products</h5>
        <TopProducts />
        <Divider />
        <div>
            <Link to='/sell'>
                <Button className="list" type="primary" size='large'>Add a Product</Button>
            </Link>

        </div>
    </div>
)

}