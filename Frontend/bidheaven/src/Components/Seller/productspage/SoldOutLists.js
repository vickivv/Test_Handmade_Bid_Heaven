import { Link, useNavigate } from 'react-router-dom';
import { Table, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';


const { Option } = Select
const { RangePicker } = DatePicker

export const SoldOutLists = () => {
    
    //list to save sold out products data fetched from backend
    const [productData, setProductData] = useState({
        list: [],// active product lists
        count: 0 // active product counts
    });

    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    });

    // to add data fetch function



    //contact the admin user of a product
    const contactManager = (data) => {
        //to add contact api
        console.log(data.managerID);
    }

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

    const onFinish = (values) => {
        const { categoryId, date} = values
        const _params = {}
        // 初始化频道
        if (categoryId) {
          _params.category = categoryId
        }
        // 初始化时间
        if (date) {
          _params.begin_pubdate = date[0].format('YYYY-MM-DD')
          _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        // 修改params数据 引起接口的重新发送 对象的合并是一个整体覆盖 改了对象的整体引用
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
          dataIndex: 'pictures',
          width: 120,
          render: pictures => {
            return <img src={pictures[0]} width={80} height={60} alt="" />
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
          dataIndex: 'bidNum'
        },
        {
            title: 'Post Date',
            dataIndex: 'postDate'
          },
        {
          title: 'Operations',
          render: data => {
            return (
              <Space size="middle">
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<CommentOutlined />}
                  onClick={() => contactManager(data)}
                />
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
            pictures: [
                "",
            ],
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
                <Link to="/">Seller's Page</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/products">My Products</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Sold-out Products</Breadcrumb.Item>
            </Breadcrumb>
          }
          style={{ marginBottom: 20 }}
        >
          <Form
            onFinish={onFinish}
            initialValues={{ status: null }}>

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
        <Card title={`One Product Found:`}> {/*待前文fetch逻辑加入后将One修改为count*/}
        {/*待前文fetch逻辑加入后将dataSource修改为productData; total改为productData.count*/}
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data} 
            pagination={
              {
                pageSize: params.per_page,
                total: 1,
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