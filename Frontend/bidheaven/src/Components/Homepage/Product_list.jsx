import React from 'react'

import jewelry1_1 from '../../Assests/images/Jewelry_and_Accessories/jewelry1_1.png'
import "../../Styles/Product_list.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock} from  '@fortawesome/free-solid-svg-icons';




function Product_list(){

return (
<div className="product-list">
<div className="title">
<h2> Upcoming Auctions </h2>
</div>


<div className="action-items">
<div className="auction-item">
    <img src={jewelry1_1} alt="Item description" className="jewelry"/>
    <h3>Buddha Stone Healing Lucky Bracelet</h3>
    <p>Start at:$50</p>
    <FontAwesomeIcon icon={faClock} className="alarm-icon" />
    <p>Start Date:March 25, 2024, 12:00PM</p>
    <a href="/detail">View Details</a>






</div>



</div>




</div>



)

};
export default Product_list;