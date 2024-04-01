import React from 'react'
import logo1 from '../../Assests/logo1.png'
import '../../Styles/Header.css'



function Header(){

return (

   <div className="header">
      <div className="logo-container">
         <img src={logo1} alt="logo" className="logo"/>
     </div>
     <div className="search-bar input-group">
  <input type="text" className="form-control" placeholder="Search items" aria-label="Search items" aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <button className="btn" id="basic-addon2" type="button">
      <i className="fas fa-search"></i>
    </button>
  </div>
</div>


     <div className="auth-buttons">
      <button className="login">Log in</button>
      <button className="sign-up">Sign up</button>

     </div>

   </div>

)

}

export default Header