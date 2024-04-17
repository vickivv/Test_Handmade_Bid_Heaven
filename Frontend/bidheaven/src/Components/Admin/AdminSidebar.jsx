

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// import "../Admin/sidebar.css";
import { FaRegListAlt,FaRegFileAlt, FaBoxOpen, FaUser, FaChartLine } from 'react-icons/fa';
import { RiFileList2Line, RiUser3Line } from 'react-icons/ri';

const { Sider } = Layout;

function AdminSidebar({ onMenuSelect }) {
  const navigate = useNavigate();

  // 修改handleMenuClick来调用onMenuSelect传递给AdminDashboard的方法
  const handleMenuClick = (e) => {
    // 更新URL，如果你想保持URL与显示内容同步（这一步是可选的）
    navigate(`/admin-dashboard/${e.key}`);
    // 调用父组件方法来更新当前视图
    onMenuSelect(e.key);
  };

  return (
    <Sider className="sider" width={200}>
      <Menu
        mode="inline"
        onClick={handleMenuClick} // 添加onClick处理函数
        style={{ height: '100%', borderRight: 0 }}
      >
        {/* 移除了Link组件 */}
        <Menu.Item key="overview">
          <FaChartLine /> <span>Order Overview</span>
        </Menu.Item>

        <Menu.Item key="ManageUsers">
          <FaUser /> <span>Manage Users</span>
        </Menu.Item>

        <Menu.Item key="report">
          <FaRegFileAlt /> <span>report</span>
        </Menu.Item>

        {/* 其他菜单项... */}
      </Menu>
    </Sider>
  );
}

export default AdminSidebar;