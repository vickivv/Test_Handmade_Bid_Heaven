import React,{useState}from "react"
import {Layout} from 'antd';
import {FiPlus} from 'react-icons/fi'
import {AiOutlineStop} from 'react-icons/ai'
import { RiSendPlane2Line,RiDeleteBinLine,RiArchiveLine } from "react-icons/ri";
import "../../Styles/Message_Nav.css"
const {Header} =Layout;

function Nav (){
    const handleClick = () => {
        console.log('Button clicked');
    };
    return (
        <>
        
        <div className = "nav-bar">
        <a onClick={handleClick}> <FiPlus/><span>New Message </span> </a>
        <div className="container">
            <a> <RiDeleteBinLine/> <span>Delete</span></a>
            <a> <RiArchiveLine/> <span>Archive</span></a>
            <a> <AiOutlineStop/> <span>Junk</span></a>
            <a> <RiSendPlane2Line/> <span>Sent</span></a>

        </div>
        </div>
        </>
   




      



    );
}

export default Nav;
