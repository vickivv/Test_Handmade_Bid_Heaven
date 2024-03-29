import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd';
import { Link, useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './products.css';
import { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select

export const AddNewProduct = () => {

    //to save the uploaded pictures of the product
    const [fileList, setFileList] = useState([]);
    const cacheImgList = useRef([])
    const onUploadChange = ({ fileList }) => {
      const formatList = fileList.map(file => {
        if (file.response) {
          return {
            url: file.response.data.url
        }
      }
      return file
      })
      setFileList(formatList)
      cacheImgList.current = formatList
    }

    const navigate = useNavigate();

    //to add fetch data process
    // const onFinish = async (values) => {
    //   const { name, categoryId, description, startPrice, type, inventory } = values
    //   const params = {
    //     
    //     name, 
    //     categoryId, 
    //     description, 
    //     startPrice, 
    //     inventory,
    //     picture: {
    //       type: type,
    //       images: fileList.map(item => item.url)
    //   }
    // }

    // if (id) {
    //  await http.put(``, params)
    // } else {
    //   await http.post('', params)
    // }

    // navigate('/products')
    // message.success(`${id ? '更新成功' : '发布成功'}`)
  

  //待加入数据回填功能
  const [form] = Form.useForm()

      //to change to fetch from database
    const categoryList = [
        {id:1, name:'Ceramics and Glass'},
        {id:2, name:'Paper Crafts'},
        {id:3, name: 'Yarn and Fiber Crafts'},
        {id:4, name: 'Upcycling Crafts'},
        {id:5, name: 'Decorative Crafts'},
        {id:6, name: 'Fashion Crafts'},
        {id:7, name:'Miscellaneous Crafts'}
    ];

 return (
  <div className="publish">
  <Card
    title={
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
            <Link to="/">Seller's Page</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to="/products">My Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>List a Product</Breadcrumb.Item>
      </Breadcrumb>
    }
  >
    {/* 待加入onFinish={onFinish} */}
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ type: 1, content: '' }}
      form={form}
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input product name.' }]}
      >
        <Input placeholder="Product name..." style={{ width: 400 }} />
      </Form.Item>
      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: 'Please select category.' }]}
      >
        <Select placeholder="Category..." style={{ width: 400 }}>
          {categoryList.map(item => (
            <Option key={item.id} value={item.id}>{item.name}</Option>
          ))}

        </Select>
      </Form.Item>
      <Form.Item
        label="Start Price"
        name="startPrice"
        rules={[{ required: true, message: 'Please input starting price for the product.' }]}
      >
        <Input placeholder="Start price..." style={{ width: 400 }} />
      </Form.Item>

      <Form.Item
        label="Inventory"
        name="inventory"
        rules={[{ required: true, message: 'Please input the inventory the product.' }]}
      >
        <Input placeholder="Inventory..." style={{ width: 400 }} />
      </Form.Item>

      <Form.Item label="Pictures">
        <Form.Item name="type">
        </Form.Item>
        {/* 待加入action="upload link" */}
        { (
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList
            fileList={fileList}
            onChange={onUploadChange}
          >
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
        )}

      </Form.Item>
      {/* 这里的富文本组件 已经被Form.Item控制 */}
      {/* 它的输入内容 会在onFinished回调中收集起来 */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input description for the product.' }]}
      >
        <ReactQuill theme="snow" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Card>
</div>
)

}