import React, { useState } from 'react';
import { Link }  from 'react-router-dom';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import Overview from '../../Pages/Buyer_dashboard'
import Orders from '../../Pages/Orders'
import './sidebar.css'


function getItem(label, key, icon, path, children, type) {
  return {
    key,
    icon,
    label: <Link to={path} style={{ textDecoration: 'none' }}>{label}</Link>,
    children,
    type,
  };
}

const items = [
  getItem('Overview', '1', <PieChartOutlined style={{ color: '#50123c' }}/>, '/buyer/overview'),
  getItem('My Orders', '2', <ContainerOutlined style={{ color: '#50123c' }}/>, '/buyer/order'),
  getItem('My Bidding', '3', <SyncOutlined style={{ color: '#50123c' }}/>, '/buyer/bid'),
];

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']); // 默认选中项的 key
  const handleMenuSelect = ({ key }) => {
    setSelectedKeys([key]);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default CustomSidebar;
