import React, { useEffect, useState } from 'react';
import { Card, Layout, List, Typography, Image, Button,Input } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../Styles/Product_list.css'
import { SearchOutlined } from '@ant-design/icons';


const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const ip = 'http://localhost:8000/media/'; 
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

const highlightSearchQuery = (text) => {
  if (searchQuery.trim() === '') {
    return text;
  }
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: 'yellow' }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};



  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/getallproducts?status=Active');
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



  const handleNavigateToAddbid = async (productid) => {
   

      navigate(`/bidding/${productid}`);
    
  };


  const handleViewDetails = (productid) => {
    console.log('View Details clicked for product ID:', productid);
    navigate(`/product/${productid}`);
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
        <Search
          placeholder="Search items"
          onSearch={handleSearch}
          style={{ marginBottom: '1rem', width: 300 }}
        />


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
                <Card.Meta title={highlightSearchQuery(product.name)} description={product.category} />
              </Card>

           
            </List.Item>
          )}
        />
 

      </Content>
    </Layout>
  );
};

export default ProductList;
