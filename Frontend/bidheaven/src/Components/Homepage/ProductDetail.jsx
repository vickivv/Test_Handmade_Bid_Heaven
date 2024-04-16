import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Typography ,Col} from 'antd';

const { Title, Paragraph } = Typography;
const ip = 'http://localhost:8000/media/';
const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getproduct/${productId}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <Card>
      <Title>{product.name || 'N/A'}</Title>
      <Paragraph>{product.description || 'No description available.'}</Paragraph>
      <Paragraph>Category: {product.category}</Paragraph>
      {/* <Paragraph>Start Price: {product.startPrice}</Paragraph>*/
      <Paragraph>Inventory: {product.inventory}</Paragraph>}
      {product.pictures && product.pictures.map((picture, index) => (
         <Col key={index} xs={24} sm={12} md={8} lg={6}>
        <Image key={index} src={`${ip}${picture}`} alt={product.name || 'Product Image'} />
        </Col>
      ))}
     
    </Card>
  );
};

export default ProductDetails;