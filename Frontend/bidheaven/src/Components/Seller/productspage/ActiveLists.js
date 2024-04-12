import { Link, useNavigate } from 'react-router-dom';
import { Table, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {http} from '../utils/http';

const ip = 'http://localhost:8000/media/';
const { Option } = Select
const { RangePicker } = DatePicker

export const ActiveLists = () => {

    const userId = localStorage.getItem('userId');
    //list to save active products data fetched from backend
    const [productData, setProductData] = useState({
        list: [],
        count: 0 
    });

    // page settings
    const [params, setParams] = useState({
        userId: userId,
        status: 'Active',
        page: 1,
        per_page: 10
    });

    // data fetch function
    useEffect(() => {
      const loadList = async () => {
        const userId = localStorage.getItem('userId');
        const res = await http.get('/getproducts', { params })
        const { result, total_count } = res.data
        setProductData({
          list: result,
          count: total_count
        })
      }
      loadList()
    }, [params])

    //modify product
    const navigate = useNavigate();
    const modifyProduct = (data) => {
      navigate(`/seller/sell?id=${data.productid}`); 
    };

    //delete product
    const delProduct = async (data) => {
        console.log(data.productid);
        await http.delete(`deleteproduct/${data.productid}/`)
        
        setParams({
           ...params,
           page: 1
        })
    }

    //contact the admin user of a product
    const contactManager = (data) => {
        //to add contact api
        navigate('/new-message');
    }

    //fetch category from database
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategory = async () => {
      await http.get("/category").then((res) => {
        const categories = res.data;
        const allCategory = { id: -1, name: 'All' };
        const newCategoryList = [allCategory].concat(categories);
        setCategoryList(newCategoryList); 
      });
    }

    useEffect(() => {
      fetchCategory();
    }, []);

    // filter function
    const onFinish = (values) => {
        const { categoryid, date, biddingstatus } = values
        const _params = {}
        if (biddingstatus===0){
          _params.bidnum = 1
        }else if (biddingstatus===1){
          _params.bidnum = 0
        }else if (biddingstatus===2){
          _params.bidnum = -1
        }

        if (categoryid != undefined && categoryid != null) {
          _params.category = categoryid
        }

        if (date) {
          _params.begin_postdate = date[0].format('YYYY-MM-DD')
          _params.end_postdate = date[1].format('YYYY-MM-DD')
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
                  onClick={() => contactManager()}
                />
                </Tooltip>
              </Space>
            )
          },
          fixed: 'right'
        }
    ]

    return (
        <div>
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/seller/overview">Seller's Page</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/seller/products">My Products</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Active Products</Breadcrumb.Item>
            </Breadcrumb>
          }
          style={{ marginBottom: 20 }}
        >
          <Form
            onFinish={onFinish}
            initialValues={{ status: null }}>
            <Form.Item label="Bidding Status" name="biddingstatus">
              <Radio.Group>
                <Radio value={0}>All</Radio>
                <Radio value={1}>No Bidding</Radio>
                <Radio value={2}>Has Bidding</Radio>
              </Radio.Group>
            </Form.Item>
  
            <Form.Item label="Category" name="categoryid">
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