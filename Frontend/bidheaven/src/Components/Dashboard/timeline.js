import React from 'react';
import { SmileOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const CustomTimeline = ({ status }) => {
    const statuses = ['Awaiting Shipment','Shipped','In Transit','Out for Delivery','Delivered','Delayed','Returned'];
    const activeIndex = statuses.indexOf(status);
    const timelines = [0, 1, 4]
    const child = ['Seller is processing your order', 'Your order has shipped', 'Your order has been successfully delivered']

    const items = timelines.map((timelineName, index) => {
    // 如果当前索引小于等于 lastActiveIndex，则为激活状态
    const isActive = timelineName <= activeIndex;
    const color = isActive ? 'green' : 'gray'; // 激活状态使用绿色，否则使用灰色
    const dot = isActive ? <CheckCircleOutlined /> : <ClockCircleOutlined />; // 根据是否激活选择图标

    return (
      <Timeline.Item key={index} color={color} dot={dot}>
        {child[index]}
      </Timeline.Item>
    );
  });

  return (
      <Timeline>{items}</Timeline>
  );
};
export default CustomTimeline;