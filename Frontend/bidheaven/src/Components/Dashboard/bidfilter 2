import React from 'react';
import { Segmented } from 'antd';
import './filter.css'

const BidFilter = ({ selectedStatus, setSelectedStatus }) => (
  <Segmented
    options={['All Bids', 'Pending', 'Accepted', 'Rejected', 'Canceled', 'Expired']}
    value={selectedStatus}
    onChange={(value) => setSelectedStatus(value)}
    className="large-segment"
    block
  />
);

export default BidFilter;