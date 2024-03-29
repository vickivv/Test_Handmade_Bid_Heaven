import { Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SellerHeader } from './SellerHeader';
import "./layout.css";

const { Header, Sider } = Layout

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
            <Menu.Item key="/overview">
              <Link to='/overview' style={{textDecoration: 'none'}}>Overview</Link>
            </Menu.Item>
            <Menu.SubMenu
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
            <Menu.Item key="/biddings" >
              <Link to='/biddings' style={{textDecoration: 'none'}}> My Biddings</Link>
            </Menu.Item>
            <Menu.Item key="/orders" >
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