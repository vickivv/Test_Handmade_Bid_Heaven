import React from 'react';
import { Carousel, Button } from 'antd';
import {Link} from 'react-router-dom';
import flower1 from '../../../Assests/flower1.jpg';
import flower2 from '../../../Assests/flower2.jpeg';
import flower3 from '../../../Assests/flower3.png';
import nopicture from '../../../Assests/nopicture.png';
import './products.css';

export const Products = () => {

    const picStyle = {
        textAlign: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        background: '#364d79',
        overflow: 'hidden',  
    };

    return (
    <div>
        <div><h1 style={{'font-weight': 'bolder', 'margin':'10px'}}>Top Three Sales</h1></div>
        <div  className = 'imgcontainer'>
                <Carousel autoplay effect="fade">
                    <div >
                        <Link to='/activeproducts'>
                            <img style={picStyle} src={flower1 || nopicture} alt="" />
                        </Link>
                    </div>
                    <div>
                        <Link to='/activeproducts'>
                        <img style={picStyle} src={flower2 || nopicture} alt="" />
                        </Link>
                    </div>
                    <div>
                        <Link to='/activeproducts'>
                        <img style={picStyle} src={flower3 || nopicture} alt="" />
                        </Link>
                    </div>
                </Carousel>
        </div>
        <div>
            <Link to='/sell'>
                <Button type="primary">List a Product</Button>
            </Link>
        </div>
    </div>
)

}