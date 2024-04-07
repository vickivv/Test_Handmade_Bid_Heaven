import React from 'react'
import Header from '../Homepage/Header';
import SideBar from './SideBar';
import Nav from './nav';
import Lists from './Lists';

import "../../Styles/Header.css"
import "../../Styles/Messages.css"


function Messages (){

    return (
      <div calssName="Message-container">
        <Header/>
        <Nav/>
        <div className="Message-content">
            <div className="side-menu-container">
            <SideBar/>
            </div>
            
            <div className="list-menu-container">
            <Lists/>
            </div>
        </div>




      </div>



    );
}
export default Messages;