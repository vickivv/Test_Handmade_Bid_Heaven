import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineInbox, AiFillFlag } from 'react-icons/ai';
import { RiSendPlane2Line } from 'react-icons/ri';
import { Layout, Menu } from 'antd';
import '../../Styles/SideBar.css'

const { Sider } = Layout;

function SideBar() {
  const [selectedKey, setSelectedKey] = useState('1'); 

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Sider width={200} style={{ background: '#fff' }} collapsible collapsed={false}>
      <div className="logo" />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/inbox">
            <AiOutlineInbox />
            <span>Inbox</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/sent">
            <RiSendPlane2Line />
            <span>Sent</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/flagged">
            <AiFillFlag />
            <span>Flagged</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
