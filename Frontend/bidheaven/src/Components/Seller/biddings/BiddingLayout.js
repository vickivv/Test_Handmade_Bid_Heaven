import { Menu } from 'antd';
import { useState } from 'react';
import {Link, Outlet} from 'react-router-dom';


export const BiddingLayout = () => {
    const [current, setCurrent] = useState('pending');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="pending">
              <Link to='/pendingbids' style={{textDecoration: 'none'}}>Pending Bids</Link>
        </Menu.Item>
        <Menu.Item key="accepted">
            Accepted Bids
        </Menu.Item>
        <Menu.Item key="rejected">
            Rejected Bids
        </Menu.Item>
        <Menu.Item key="canceled">
            Canceled Bids
        </Menu.Item>
        <Menu.Item key="expired">
            Expired Bids
        </Menu.Item>
        <Outlet />
    </Menu>
    );
}