import React, { useState, useEffect, useContext } from 'react';
import "../../Styles/NewMessageForm.css";
import { useAuth } from '../Context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../Context/MessageContext.jsx';
import instance from '../../axios/axios.js';

function NewMessageForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const navigate = useNavigate();
  const { message, updateMessage } = useContext(MessageContext);
  const { user } = useAuth();
  const context = useContext(MessageContext);
  const [productSearch, setProductSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      updateMessage({ from_email: storedEmail });
    }
  }, []);
  
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipients = to.split(',').map(email => email.trim());
    console.log('From:', message.from_email);
    console.log('To:', recipients);
    console.log('Subject:', subject);
    console.log('Content:', content);
    console.log('Subject Type:', subjectType);
    console.log('Extra Info:', extraInfo);

  const productInfo = subjectType === 'Product' ? extraInfo : null;
  const orderInfo = subjectType === 'Order' ? extraInfo : null;
    const newMessage = {
      from_email: message.from_email,
      to_email: recipients.join(','),
      subject_type: subjectType,
      content: content,
      product_info: productInfo,
      order_info: orderInfo,
    };

    updateMessage(newMessage);

    try {
      const response = await sendMessageToBackend(newMessage);
      console.log('Message sent successfully:', response);
      alert("Message sent successfully.");
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const sendMessageToBackend = async (messageData) => {
    try {
      const response = await instance.post('/api/messages/send/', messageData);
      if (response && response.data) {
        console.log('Message sent successfully:', response.data);
        navigate('/message');
        return response.data;
      } else {
        console.error('Failed to send message: No response data received.');
        return Promise.reject(new Error('No response data'));
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred. Please try again.';
      alert(`Failed to send message: ${errorMessage}`);
      return Promise.reject(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/message');
  };

// handle product search 
const handleProductSearch = async (e) => {
  const searchTerm = e.target.value;
  setProductSearch(searchTerm);

  if (searchTerm) {
    try {
      const response = await instance.get(`/api/products?search=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Failed to search products:', error);
    }
  } else {
    setSearchResults([]);
  }
};

//handle product select 
const handleProductSelect = (product) => {
  setExtraInfo(product.name);
  setSearchResults([]);
};





  return (
    <div className="email-form-container">
      <div className="email-form-header">
        <div className="email-form-title">Message</div>
      </div>
      <form onSubmit={handleSubmit} className="email-form">
        <div className="email-form-row">
          <label htmlFor="email-from">From:</label>
          <input id="email-from" type="text" value={message.from_email} readOnly className="email-form-input" />
        </div>
        <div className="email-form-row">
          <label htmlFor="email-to">To:</label>
          <input id="email-to" type="text" value={to} onChange={(e) => setTo(e.target.value)} required className="email-form-input" />
        </div>
        <div className="email-form-row">
          <label htmlFor="email-subject">Subject:</label>
          <select
            id="email-subject-type"
            value={subjectType}
            onChange={(e) => setSubjectType(e.target.value)}
            required
          >
            <option value="">Select Subject Type</option>
            <option value="Product">Product</option>
            <option value="Order">Order</option>
          </select>
        </div>
        {subjectType === 'Product' && (
          <div className="email-form-row">
            <label htmlFor="email-product-info">Product Info:</label>
            <input
              id="email-product-info"
              type="text"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="email-form-input"
            />
 <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={handleProductSearch}
              className="email-form-input"
            />
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}



          </div>
        )}
        {subjectType === 'Order' && (
          <div className="email-form-row">
            <label htmlFor="email-order-info">Order Info:</label>
            <input
              id="email-order-info"
              type="text"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="email-form-input"
            />
          </div>
        )}
        <div className="email-form-row">
          <label htmlFor="email-content">Message</label>
          <textarea id="email-content" className="email-textarea" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="email-form-toolbar">
          <button type="submit" className="email-form-send">Send</button>
          <button type="submit" className="email-form-Cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;



