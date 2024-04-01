import React from 'react';
import { Segmented } from 'antd';
import './filter.css'

const Filter = ({ selectedStatus, setSelectedStatus }) => (
  <Segmented
    options={['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Refunded', 'Failed']}
    value={selectedStatus}
    onChange={(value) => setSelectedStatus(value)}
    className="large-segment"
    block
  />
);

export default Filter;
