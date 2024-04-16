import React from 'react'
import ReactDOM from 'react-dom'
import "../../Styles/Nav.css"
import { useNavigate ,useLocation} from 'react-router-dom';

function Nav({ onCategoryClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleCategoryClick =(category)=>{
    if (category ==='All'){
      navigate('/');
    }else{
      onCategoryClick(category);
    }
  }

    return (
        <nav className="navbar">
            <div
        className="nav-item"
        onClick={() => handleCategoryClick('All')}
        style={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}
      >
        All
      </div>

      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Ceramics and Glass')}
      >
       Ceramics and Glass
      </div>


      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Paper Crafts')}
      >
         Paper Crafts
      </div>

      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Yarn and Fiber Crafts')}
      >
        Yarn and Fiber Crafts
      </div>
      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Upcycling Crafts')}
      >
        Upcycling Crafts
      </div>
      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Decorative Crafts')}
      >
        Decorative Crafts
      </div>
      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Fashion Crafts')}
      >
        Fashion Crafts
      </div>
      <div
        className="nav-item"
        onClick={() => handleCategoryClick('Miscellaneous Crafts')}
      >
        Miscellaneous Crafts
      </div>





      </nav>
      


    );
  }
  
  export default Nav;
  