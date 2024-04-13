import React from 'react'
import ReactDOM from 'react-dom'
import "../../Styles/Nav.css"


function Nav() {

    return (
        <nav className="navbar">
        <div className="nav-item"><a href="/jewelry">Jewelry and Accessories</a></div>
        <div className="nav-item"><a href="/apparel">Apparel</a></div>
        <div className="nav-item"><a href="/homedecor">Home Decor</a></div>
        <div className="nav-item"><a href="/beauty">Beauty and Personal Care</a></div>
        <div className="nav-item"><a href="/handicrafts">Handicrafts</a></div>
        <div className="nav-item"><a href="/toys">Toys</a></div>
        <div className="nav-item"><a href="/other">Other</a></div>
      </nav>
      


    );
  }
  
  export default Nav;
  