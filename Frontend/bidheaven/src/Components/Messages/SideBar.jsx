// SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineInbox } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { RiSendPlane2Line, RiArchiveLine } from 'react-icons/ri';
import { AiOutlineStop } from 'react-icons/ai';

import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideBar() {
  return (
    <>
        <Sider
      width={200}
      style={{ background: '#fff' }}
      collapsible
      collapsed={false}
    >
      <div className="logo" />
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" title="Favorites">
          <Menu.Item key="1">
            <Link to="/inbox">
              <AiOutlineInbox /> <span>Inbox</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/compose">
              <BsPencil /> <span>Compose</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/draft">
              <RiSendPlane2Line /> <span>Draft</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/sent">
              <RiArchiveLine /> <span>Sent</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/flagged">
              <AiOutlineStop /> <span>Flagged</span>
            </Link>
          </Menu.Item>
         
        </SubMenu>
        <SubMenu key="sub2" title="Folders">
        <Menu.Item key="6">
            <Link to="/trash">
              <AiOutlineInbox /> <span>Trash</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    
    </>



  );
}

export default SideBar;
