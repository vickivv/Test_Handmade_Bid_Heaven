import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './products.css';
import { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {http} from '../../Seller/utils/http'

const { Option } = Select

export const AddNewProduct = () => {

    //to save the uploaded pictures of the product
    const [fileList, setFileList] = useState([]);
    const [pictures, setPictures] = useState([]);
    //define a cache repo
    const cacheImgList = useRef([])

    //when uploading pictures, save one to fileList and one to the cache repo

    const onUploadChange = ({ fileList }) => {
      const formatList = fileList.map(file => {
        return file
      })
      const pictureKeys=fileList.map(file => {
        if(file.response){
          return file.response;
      }})
      setFileList(formatList)
      cacheImgList.current = formatList
      setPictures(pictureKeys)
    }

    //fetch category data from database
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategory = async () => {
      await http.get("/category").then((res) => {
        setCategoryList(res.data); 
      });
    }
    useEffect(() => {
      fetchCategory();
    }, []);

    // push data to database after submit the Form
    const navigate = useNavigate();
    const onFinish = async (values) => {
      const { name, category, description, startPrice, inventory } = values
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", categoryList[category].name)
      formData.append("description", description)
      formData.append("startPrice", parseInt(startPrice))
      formData.append("inventory", parseInt(inventory))
      formData.append("pictures", pictures)
    // if (id) {
    //   await http.put(`/addproduct/${id}`, params)
    // } else {
      await http.post(`/addproducts`, formData)
  //  }


    navigate('/activeproducts')
    message.success('List Completed')
  }

  //Edit mode, fetch data before edit
  // const [params] = useSearchParams()
  // const id = params.get('id')
  // const [form] = Form.useForm()
  // useEffect(() => {
  //   const loadDetail = async () => {
  //     const res = await http.get(`/getproduct/${id}`)
  //     const data = res.data
  //     form.setFieldsValue({ ...data, type: data.pictures.type })
  //     const formatImgList = data.pictures.images.map(url => ({ url }))
  //     setFileList(formatImgList)
  //     cacheImgList.current = formatImgList
  //     setImageCount(data.cover.type)
  //   }
  //   if (id) {
  //     loadDetail()
  //   }
  // }, [id, form])



   
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
        <Breadcrumb.Item>{'List Product'}</Breadcrumb.Item>
      </Breadcrumb>
    }
  >

    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ type: 1, content: '' }}
      onFinish={onFinish}
      // form={form}
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
        name="category"
        rules={[{ required: true, message: 'Please select category.' }]}
      >
        <Select placeholder="Select Category" style={{ width: 400 }}>
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
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList
            action="http://127.0.0.1:8000/uploadpicture"
            fileList={fileList}
            onChange={onUploadChange}
            maxCount={3}
          >
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
       </Form.Item> 

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
            {'Submit'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Card>
</div>
)

}