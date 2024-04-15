import React from 'react'
import ReactDOM from 'react-dom'
import "../../Styles/Nav.css"
import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();

  

    return (
        <nav className="navbar">
        <div className="nav-item" onClick={() => navigate('/ceramics')}>Ceramics and Glass</div>
        <div className="nav-item"><a href="/apparel">Paper Crafts</a></div>
        <div className="nav-item"><a href="/homedecor">Yarn and Fiber Crafts</a></div>
        <div className="nav-item"><a href="/beauty">Upcycling Crafts</a></div>
        <div className="nav-item"><a href="/handicrafts">Decorative Crafts</a></div>
        <div className="nav-item"><a href="/toys">Fashion Crafts</a></div>
        <div className="nav-item"><a href="/other">Miscellaneous Crafts</a></div>
      </nav>
      


    );
  }
  
  export default Nav;
  