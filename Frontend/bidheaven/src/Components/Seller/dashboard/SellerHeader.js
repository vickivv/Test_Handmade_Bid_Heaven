import logo1 from '../../../Assests/logo1.png'
import './SellerHeader.css';
import { Button } from 'antd';
import { UserOutlined} from '@ant-design/icons';

export const SellerHeader = () => {
    return (
        <div className="header">
        <div className="logo-container">
           <img src={logo1} alt="logo" className="logo"/>
       </div>
       <div className="accountbutton">
        {/* 待确认跳转页面后，添加跳转link */}
        <Button icon={<UserOutlined />} />
        {/* 待连入后端后，添加logout逻辑 */}
        <button className="logOut" style={{margin: "10px"}}>Log Out</button>
        </div>
  
     </div>
    )
}