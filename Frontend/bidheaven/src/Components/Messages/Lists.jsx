import React from 'react'
import {List,Avatar,Space} from 'antd';

function Lists(props){

    const data = props.inbox?props.inbox.map(mail=>({
        key:mail.id,
        title:mail.title,
        subject:mail.subject


    })):[];
    return (
        <List  itemLayout='horizontal'
        dataSource={data}
        renderItem={item=>(
            <a onClick={props.handleClick.bind(this,item.key)}><List.Item>

            <List.Item.Meta
               rowKey={item.key}
               avatar={<Avatar style={{backgroundColor:"#18a1ff"}}>{item.title ===undefined ?'N':item.title.split('')[0]}</Avatar>}
               title={item.title===undefined ?'No title':item.title}
               description={item.subject}
            
            
            
            
            
            />
            </List.Item>
            </a>
        )}
         >  </List>



    );

}
export default Lists;