import { Link, useNavigate } from 'react-router-dom';
import { Table, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {http} from '../utils/http';

const ip = 'http://localhost:8000/media/';
const { Option } = Select
const { RangePicker } = DatePicker

export const ActiveLists = () => {

    //list to save active products data fetched from backend
    const [productData, setProductData] = useState({
        list: [],// active product lists
        count: 0 // active product counts
    });


    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    });

    // to add data fetch function
    useEffect(() => {
      const loadList = async () => {
        const res = await http.get('/activeproducts', { params })
        const { result, total_count } = res.data
        setProductData({
          list: result,
          count: total_count
        })
      }
      loadList()
    }, [params])

    //modify product info
    const navigate = useNavigate();
    const modifyProduct = (data) => {
      navigate(`/sell`); 
    };

    //delete product
    const delProduct = (data) => {
        //to add delete logic
        // await http.delete(``)
        // setParams({
        //   ...params,
        //   page: 1
        // })
        console.log('product deleted');
    }

    //contact the admin user of a product
    const contactManager = (data) => {
        //to add contact api
        console.log(data.managerID);
    }

    //to change to fetch from database
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategory = async () => {
      await http.get("/category").then((res) => {
        setCategoryList(res.data); 
      });
    }
    useEffect(() => {
      fetchCategory();
    }, []);

    const onFinish = (values) => {
        const { categoryId, date, status } = values
        const _params = {}
        _params.status = status
       
        if (categoryId) {
          _params.category = categoryId
        }
        if (date) {
          _params.begin_pubdate = date[0].format('YYYY-MM-DD')
          _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        setParams({
          ...params,
          ..._params
        })
    }

    const pageChange = (page) => {
        setParams({
          ...params,
          page
        })
    }

    const columns = [
        {
          title: 'Product Picture',
          dataIndex: 'picture', 
          width: 120,
          render:  (picture) => {
            const picture_path = picture.replace(/\"/g,"")
            const path = `${ip}${picture_path}`
            console.log(path)
            return <img src={`${path}`} width={80} height={60} />
          }
        },
        {
          title: 'Product Name',
          dataIndex: 'name',
          width: 220
        },
        {
          title: 'Category',
          dataIndex: 'category',
        },
        {
          title: 'Description',
          dataIndex: 'description'
        },
        {
          title: 'Start Price',
          dataIndex: 'startPrice'
        },
        {
          title: 'Inventory',
          dataIndex: 'inventory'
        },
        {
          title: 'Bidding number',
          dataIndex: 'bidnum'
        },
        {
            title: 'Post Date',
            dataIndex: 'postdate'
          },
        {
          title: 'Operations',
          render: data => {
            return (
              <Space size="middle">
                <Tooltip title="Edit Product">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => modifyProduct(data)} />
                </Tooltip>
                <Tooltip title="Delete Product">
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => delProduct(data)}
                />
                </Tooltip>
                <Tooltip title="Contact Admin">
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<CommentOutlined />}
                  onClick={() => contactManager(data)}
                />
                </Tooltip>
              </Space>
            )
          },
          fixed: 'right'
        }
    ]

    const data = [
        {
            name: 'Stained Glass Flowers',
            category: 'Ceramics and Glass',
            description: 'Stained glass flowers inspired by beautiful fall foliage',
            startPrice: 20.0,
            inventory: 1,
            bidnum: 2,
            picture: "",
            managerID: 1,
            postDate: '2024-03-01'
        }
    ]

    return (
        <div>
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/overview">Seller's Page</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/products">My Products</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Active Products</Breadcrumb.Item>
            </Breadcrumb>
          }
          style={{ marginBottom: 20 }}
        >
          <Form
            onFinish={onFinish}
            initialValues={{ status: null }}>
            <Form.Item label="Bidding Status" name="status">
              <Radio.Group>
                <Radio value={null}>All</Radio>
                <Radio value={0}>No Bidding</Radio>
                <Radio value={1}>Has Bidding</Radio>
              </Radio.Group>
            </Form.Item>
  
            <Form.Item label="Category" name="category">
              <Select
                placeholder="Please choose category."
                style={{ width: 120 }}
              >
                {categoryList.map(category => <Option key={category.id} value={category.id}>{category.name}</Option>)}
              </Select>
            </Form.Item>
  
            <Form.Item label="Post Date" name="date">
              <RangePicker></RangePicker>
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title={productData.count == 1 ? ` One Product Found:`: `${productData.count} Products Found:`}> 
          <Table
            rowKey="id"
            columns={columns}
            dataSource={productData.list} 
            pagination={
              {
                pageSize: params.per_page,
                total: productData.count,
                onChange: pageChange,
                current: params.page
              }
            }
            bordered
          />
        </Card>
      </div>
    )
}