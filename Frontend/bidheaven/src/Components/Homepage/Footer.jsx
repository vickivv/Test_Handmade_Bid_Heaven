import React from 'react'
import logo2 from '../../Assets/logo2.png'
import '../../Styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter,faCcMastercard,faCcVisa,faCcDiscover,faCcPaypal,faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import Messages from '../Messages/Messages';
import PaymentMethod from '../PaymentMethod/PaymentMethod.jsx';

function Footer() {
    const navigate = useNavigate();
    
    const handlePayment=()=>{
        navigate('/payment-method');
      }
    
    return (
        <div className="footer-container">
            <div className="footer-top-row">
                <div className="footer-top">
                    <img src={logo2} alt="Handmade Bid Heaven Logo" className="footer-logo"/>
                   
                </div>
                <div className="info-section">
                    <div className="info-text"> 
                        <p>About Us</p>
                    </div>
                    <div className="info-text"> 
                        <p>Help & Support</p>
                    </div>
                    <div className="info-text"> 
                        <p>Contact Us</p>
                        <p>313-123-4567</p>
                        <p>sample@handmadebid.com</p>
                    </div>
                    <div className="contact-bottom">
                    
                    <Link to="/message" className="chatbot-button">Message</Link>
                            
                    
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                        <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                    </div>
                    </div>
                   


                    <div className="payment-method"  onClick={handlePayment}>
                        <p>Payment Method</p>
                        <div className="payment-icons">
                            <FontAwesomeIcon icon={faCcVisa} className="payment-icon" />
                            <FontAwesomeIcon icon={faCcMastercard} className="payment-icon" />
                            <FontAwesomeIcon icon={faCcDiscover} className="payment-icon" />
                            <FontAwesomeIcon icon={faCcPaypal} className="payment-icon" />
                            <FontAwesomeIcon icon={faCcAmex} className="payment-icon" />
                        </div>
                    </div>
                </div>
            </div>

<div className="foot-bottom-row">
<p>©2024 Handmade Bid Heaven. All rights reserved.</p>

</div>



        </div>
    );
}



export default Footer;