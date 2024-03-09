import React from 'react'
import logo1 from '../../Assests/logo1.png'



function Header(){

return (

   <div className="header">
      <div className="logo-container">
         <img src={logo1} alt="logo" className="logo"/>
     </div>
     <div  className="search-bar">
      <input type="text" placeholder="Search items"/>
      
     </div>
     <div className="auth-buttons">
      <button className="login">Log in</button>
      <button className="Sign up">Sign up</button>

     </div>

   </div>


    
)

}

export default Header