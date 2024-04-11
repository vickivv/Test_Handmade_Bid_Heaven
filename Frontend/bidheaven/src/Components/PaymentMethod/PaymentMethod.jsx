import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcMastercard, faCcVisa, faCcDiscover, faCcPaypal, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import Header from '../Homepage/Header';

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected payment method:', paymentMethod);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setShowCardForm(e.target.value === 'newCard');
  };

  return (
    <div className="payment">
      <div className="header">
        <Header />
      </div>
      <div style={{ margin: '20px' }}>
        <h2>Pay With</h2>
        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="newCard"
              checked={paymentMethod === 'newCard'}
              onChange={handlePaymentMethodChange}
            />
            Add New Card
          </label>
          {showCardForm && (
  <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '500px' }}>
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '10px' }}>Card Number</label>
      <input type="text" style={{ width: '100%' }} />
    </div>
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '10px' }}>
        <label style={{ marginRight: '10px' }}>Expiration Date</label>
        <input type="text" style={{ width: '100%' }} />
      </div>
      <div style={{ flex: '1' }}>
        <label style={{ marginRight: '10px' }}>Security Code</label>
        <input type="text" style={{ width: '100%' }} />
      </div>
    </div>
    
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '10px' }}>First Name</label>
      <input type="text" style={{ width: '100%' }} />
    </div>
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '10px' }}>Last Name</label>
      <input type="text" style={{ width: '100%' }} />
    </div>
    <div>
      <input type="checkbox" />
      <label>Remember this card for future orders</label>
    </div>
  </div>
)}

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
          <FontAwesomeIcon icon={faCcVisa} style={{ margin: '5px', color: '#1A1F71' }} />
          <FontAwesomeIcon icon={faCcMastercard} style={{ margin: '5px', color: '#EB001B' }} />
          <FontAwesomeIcon icon={faCcDiscover} style={{ margin: '5px', color: '#FF6000' }} />
          <FontAwesomeIcon icon={faCcAmex} style={{ margin: '5px', color: '#2D637F' }} />
        </div>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
            />
            <FontAwesomeIcon icon={faCcPaypal} alt="PayPal" style={{ margin: '5px' }} /> PayPal
          </label>
        </div>
        
        <button style={{ marginTop: '20px' }}>Done</button>
      </div>
    </div>
  );
}

export default PaymentMethod;