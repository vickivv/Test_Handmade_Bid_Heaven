import React, { useEffect, useState } from 'react';
import { Card, Layout, List, Typography, Image, Button,Modal } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../Styles/Product_list.css'
import instance from '../../axios/axios.js';

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const ip = 'http://localhost:8000/media/'; 
  


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = selectedCategory
        ? await fetch(`http://localhost:8000/getproducts?category=${selectedCategory.replace(/ /g, '+')}`)
        : await fetch('http://localhost:8000/getproducts?userId=1&status=Active');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const cleanedData = data.result.map(product => ({
          ...product,
          picture: `${ip}${product.picture.replace(/\\/g, "").replace(/\"/g, '')}` 
        }));
        setProducts(cleanedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  const fetchBidStatus = async (productid) => {
    try {
      const response = await instance.get(`/products/${productid}/bid-status/`);
      return response.data.bid_status;
    } catch (error) {
      console.error('Error fetching bid status:', error);
      return null;
    }
  };




  const handleNavigateToAddbid = async (productid) => {
    const bidStatus = await fetchBidStatus(productid);
    if (bidStatus === 'pending' || bidStatus === null) {
      navigate(`/bidding/${productid}`);
    } else {
      setShowModal(true);
    }
  };


  const handleViewDetails = (productid) => {
    console.log('View Details clicked for product ID:', productid);
    navigate(`/product/${productid}`);
  };
  const handleModalOk = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <Content
        style={{
          padding: '2rem',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <Title level={2}>Products</Title>
        <List
          grid={{
            gutter: [24, 24],
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 5,
          }}
          dataSource={location.pathname === '/' ? products : products.filter(product => product.category === location.pathname.slice(1))}
          renderItem={(product) => (
            <List.Item>
              <Card
              className="product-card"
                hoverable
                cover={
                    <div className='product-card-image'>
                    <Image
                    src={product.picture}
                    alt={product.name}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleNavigateToAddbid(product.productid)}
                  />
                    </div>
                 
                }
                actions={[
                  <Button type="link" onClick={() => handleViewDetails(product.productid)}>
                    View Details
                  </Button>,
                ]}
              >
                <Card.Meta title={product.name} description={product.category} />
              </Card>
            </List.Item>
          )}
        />
 <Modal
          title="Bid not available"
          visible={showModal}
          onOk={handleModalOk}
          onCancel={handleModalOk}
        >
          <p>Add Bid is not available!</p>
        </Modal>

      </Content>
    </Layout>
  );
};

export default ProductList;
