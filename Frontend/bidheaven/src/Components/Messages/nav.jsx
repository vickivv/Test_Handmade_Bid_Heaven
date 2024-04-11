import React,{useState,useContext}from "react"
import {Layout} from 'antd';
import {FiPlus} from 'react-icons/fi'
import {AiOutlineStop} from 'react-icons/ai'
import { MessageContext } from '../Context/MessageContext.jsx'
import { useNavigate } from 'react-router-dom';
import { RiSendPlane2Line,RiDeleteBinLine,RiArchiveLine } from "react-icons/ri";
import "../../Styles/Message_Nav.css"

const {Header} =Layout;

function Nav (){


    const navigate = useNavigate();
    const { deleteMessages, selectedMessages, setSelectedMessages } = useContext(MessageContext);

    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        navigate("/new-message")
    }
 
    

    return (
        <>
            <div className="nav-bar">
                <a onClick={handleClick}><FiPlus /><span>New Message</span> </a>
            
            </div>

           
        </>
    )
}

export default Nav;