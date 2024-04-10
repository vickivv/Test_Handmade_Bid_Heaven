import React, { useState,useEffect } from 'react';
import "../../Styles/NewMessageForm.css";
import { useAuth } from '../Context/AuthContext.js';
import { useNavigate } from 'react-router-dom';


const NewMessageForm = () => {
  const [from, setFrom] = useState(''); 
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const navigate = useNavigate();



  useEffect(()=>{
    const email = localStorage.getItem('Email');
    const isStaff = localStorage.getItem('isStaff')==='true';
    console.log('Retrieved from localStorage:', { email, isStaff }); 
    if (email) {
      setFrom(email);
    }


  },[]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const recipients = to.split(',').map(email => email.trim());
    console.log('From:', from);
    console.log('To:', recipients);
    console.log('Subject:', subject);
    console.log('Content:', content);
    console.log('Subject Type:', subjectType);
    console.log('Extra Info:', extraInfo);
   
  };

  const handleCancel=(e) => {
    e.preventDefault();
    setTo('');
    setSubject('');
    setContent('');
    navigate('/message'); 

  }

  return (
    <div className="email-form-container">
      <div className="email-form-header">
        <div className="email-form-title">Message</div>
      </div>
      <form onSubmit={handleSubmit} className="email-form">
        <div className="email-form-row">
          <label htmlFor="email-from">From:</label>
          <input id="email-from" type="text" value={from} readOnly className="email-form-input" />
        </div>
        <div className="email-form-row">
          <label htmlFor="email-to">To:</label>
          <input id="email-to" type="text" value={to} onChange={(e) => setTo(e.target.value)} required className="email-form-input" />
        </div>
        <div className="email-form-row">
          <label htmlFor="email-subject">Subject:</label>
          <select id="email-subject-type" value={subjectType} onChange={(e) => setSubjectType(e.target.value)} required>
            <option value="">Select Subject Type</option>
            <option value="Product">Product</option>
            <option value="Order">Order</option>
          </select>
          <input id="email-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="email-form-input" />
        </div>
        {subjectType && (
          <div className="email-form-row">
            <label htmlFor="email-extra-info">{subjectType} Info:</label>
            <input id="email-extra-info" type="text" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} required className="email-form-input" />
          </div>
        )}
        <div className="email-form-row">
          <label htmlFor="email-content">Message</label>
          <textarea id="email-content" className="email-textarea" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="email-form-toolbar">
          <button type="submit" className="email-form-send">Send</button>
          <button type="submit" className="email-form-Cancel" onClick={handleCancel}>Cancel</button>
         
        </div>

    
      </form>
    </div>
  );
};

export default NewMessageForm;


