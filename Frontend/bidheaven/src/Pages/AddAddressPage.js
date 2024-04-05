import React from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';
import Header from '../Components/Homepage/Header'
import Footer from '../Components/Homepage/Footer'
import AddAddress from '../Components/Dashboard/AddAddress'


const AddAddressPage = () => {

  return (
  <div>
  <Header />
  <AddAddress/>
  <Footer />
  </div>
  );
};
export default AddAddressPage;