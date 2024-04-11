import React from 'react';
import '../Styles/ThankYouPage.css';
import Header from '../Components/Homepage/Header'
import Footer from '../Components/Homepage/Footer'

function ThankYouPage() {
  return (
    <div>
    <Header />
    <div className="thank-you-container">
      <h1>Thank you for your order</h1>
      <p>Your order has been placed and is being processed. You will receive an email with the order details.</p>
      <div>
      <button onClick={() => window.location.href = '/buyer/overview'}>Back to dashboard</button>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default ThankYouPage;
