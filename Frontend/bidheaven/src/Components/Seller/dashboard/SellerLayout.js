import { Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SellerHeader } from './SellerHeader';
import "./layout.css";
import "./sidebar.css";
import { ContainerOutlined, PieChartOutlined, ShopOutlined, SyncOutlined } from '@ant-design/icons';

const { Sider } = Layout

export const SellerLayout = () => {
  const { pathname } = useLocation();
  const {colorBgContainer} = theme.useToken();
  return (
    <Layout>
        <SellerHeader />
      <Layout>
        <Sider width={200} style={{background: colorBgContainer}}>
          <Menu
            mode="inline"
            defaultSelectedKeys={pathname}
            selectedKeys={pathname}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<PieChartOutlined style={{color:'#50123c'}}/>} key="/overview">
              <Link to='/overview' style={{textDecoration: 'none'}}>Overview</Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<ShopOutlined style={{color:'#50123c'}}/>}
              key="/products"
              title={<Link to="/products" style={{textDecoration: 'none'}}>My Products</Link>}
            >
              <Menu.Item key="/activeproducts">
                <Link to="/activeproducts" style={{textDecoration: 'none'}}>Active Products</Link>
              </Menu.Item>
              <Menu.Item key="/soldout">
                <Link to="/soldout" style={{textDecoration: 'none'}}>Sold-out Products</Link>
              </Menu.Item>
              </Menu.SubMenu>
            <Menu.Item icon={<SyncOutlined style={{color:'#50123c'}}/>} key="/biddings" >
              <Link to='/biddings' style={{textDecoration: 'none'}}> My Biddings</Link>
            </Menu.Item>
            <Menu.Item icon={<ContainerOutlined style={{color:'#50123c'}}/>} key="/orders" >
              <Link to='/orders' style={{textDecoration: 'none'}}> My Orders</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
};