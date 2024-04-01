import React, { useState, useEffect }from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import './orderitem.css';

const cardStyle = {
  display: 'flex',
  flexDirection: 'row', // Align children in a row
  justifyContent: 'center', // Center children horizontally
  alignItems: 'center', // Center children vertically
  height: 'min-height', // Set a fixed height, or use min-height to be responsive
  margin: '10px', // Center the card itself
  border: '1px solid #ccc', // Add a light grey border
  // Add a radius to the border if you want rounded corners
  borderRadius: '8px',
  padding: '5px'
};

const colStyleBase = {
  display: 'flex',
  flexDirection: 'column', // Stack column content vertically
  justifyContent: 'center', // Center column content vertically
  textAlign: 'left'
   // Center column content horizontally (for col-20-right)
  // Common column styles...
};

const col20Style = {
  ...colStyleBase,
  flexBasis: '20%', // 20% of the card's width
  // Additional specific styles for the first column...
};

const col60Style = {
  ...colStyleBase,
  flexBasis: '60%', // 60% of the card's width
  // Additional specific styles for the middle column...
};

const col20RightStyle = {
  ...colStyleBase,
  flexBasis: '20%', // 20% of the card's width
  textAlign: 'right', // If you want the text aligned to the right within the column
  // Additional specific styles for the right column...
};

// Assuming your component structure is like this:
const BidItem = ({ bids }) => {
  if (!bids || bids.length === 0) {
    // Render a placeholder or nothing if orders are not defined or empty
      return <div>No orders found.</div>;
  }

  return (
      <div>
        {bids.map((bid, index) => (
          <div key={index} style={cardStyle}>
            <div style={col20Style}>
            <img style={{maxWidth: '180px', maxHeight: '180px'}} alt={bid.Name} src={bid.Picture}/>
            </div>
            <div style={col60Style}>
              <p>{bid.Name}</p>
              <p>{bid.Status}</p>
              <p>US${bid.BidPrice}</p>
              <p>Sold by {bid.SellerID}</p>
            </div>
            <div style={col20RightStyle}>
              <Link to={`/buyer/bid/${bid.BiddingID}`} style={{ color: '#50123c' }}>View Bid Details</Link>
            </div>
          </div>
        ))}
      </div>
  )
 };

export default BidItem;
