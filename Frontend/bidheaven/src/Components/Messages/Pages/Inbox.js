import React, {useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd';
import SideBar from '../SideBar'
import  Lists from '../Lists'
import Cards from '../Cards'
import axios from "../axios/axios"

const {Content} = Layout;
function Inbox (){
    const token = localStorage.getItem('token')
    const[mails,setMails]=useState([])
    const[mailWindow,setMailWindow] =useState([])

    // handle click need to check token 




    return (
        <>
        <Layout style={{minHeight:'100vh'}}>
            <Layout className ="site-layout">
                <Content style={{padding:"0 5px",width:"40vw",height:'100vh',scrollbarwidth:'none'}}>
                <>
                <div className="nav-bar"  style={{backgroundColor:'#fff',position:'fixed',zIndex:'160'}}> 
                  <div className="">
                    <span style={{fontSize:16}}>Inbox</span>
                  </div>
                               
                               
                </div>
                
                </>
                <Lists inbox={mails}handleClick={handleClick}/>

                </Content>

                <Content style={{width:'60vw',height:'100vh',scrollbarwidth:'none'}}>
                    <>
                    <div className="nav-bar" style ={{backgroundColor:'#fff',position:'fixed',zIndex:'160',borderLeft:'1px solid #e8e8e8'}}>
                        <div className="">
                            <a>{mailWindow.title}</a>
                        </div>
                    </div>
                    
                    </>

                   <Card subject={mailWindow.subject} body={mailWindow.body}/>

                </Content>


            </Layout>



        </Layout>


        </>



    );

}
export default Inbox;