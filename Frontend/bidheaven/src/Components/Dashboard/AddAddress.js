import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
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

const { Option } = Select;
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddAddress = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
    const userId = localStorage.getItem('userId');
    const dataToSend = {
    ...values, // 展开运算符将所有表单字段添加到新对象中
    userId,    // 添加userId
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/add_address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // 将表单数据转换为JSON字符串
      });
      console.log(values);
      if (response.ok) {
        // 请求成功后的操作
        console.log('Address saved!');
        navigate(-1);
      } else {
        // 请求失败后的操作
        console.error('Failed to save address:', response.statusText);
      }
    } catch (error) {
      // 错误处理
      console.error('There was an error saving the address:', error);
    }
  };

  return (
  <div>
  <Form
    {...formItemLayout}
    variant="filled"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
      paddingLeft:'50px',
      paddingTop: '50px'
    }}
  >
    <Form.Item
      label="First name"
      name="First name"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Last name"
      name="Last name"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Address line one"
      name="Address line one"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Address line two"
      name="Address line two"
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="City"
      name="City"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="State"
      name="State"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Select
      showSearch
      optionFilterProp="children"
    >
      {states.map(state => (
        <Option key={state} value={state}>{state}</Option>
      ))}
    </Select>
    </Form.Item>

    <Form.Item
      label="Zipcode"
      name="Zipcode"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Button htmlType="submit" style={{ margin: '50px', backgroundColor: '#9F7EAC', borderColor: '#9F7EAC', color: '#fff' }} >Save Address</Button>
    </Form>
  </div>
  );
};
export default AddAddress;