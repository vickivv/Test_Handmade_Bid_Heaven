import { Link, useNavigate } from 'react-router-dom';
import { Table, Space, Card, Form, Button, DatePicker, Select, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, CommentOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Option } = Select
const { RangePicker } = DatePicker

export const Bidding =() => {

  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  });


  const pageChange = (page) => {
    setParams({
      ...params,
      page
    });
}

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      width: 220
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      width: 220
    },
    {
      title: 'Bid Price',
      dataIndex: 'bidPrice',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Bid Date',
      dataIndex: 'bidDate'
    },
    {
      title: 'Bidder Name',
      dataIndex: 'bidderName'
    },
    {
      title: 'Bidder Rate',
      dataIndex: 'bidderRate'
    },
    {
        title: 'Valid Until',
        dataIndex: 'validDate'
      },
    {
      title: 'Operations',
      render: data => {
        return (
          <Space size="middle">
            <Tooltip title="Accept Bid">
            <Button
              type="primary"
              shape="circle"
              icon={<CheckOutlined />}
             />
            </Tooltip>
            <Tooltip title="Reject Bid">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<CloseOutlined />}
            />
            </Tooltip>
            <Tooltip title="Compare All Bids">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<FileSearchOutlined />}
            />
            </Tooltip> 
            <Tooltip title="Contact">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<CommentOutlined />}
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
        productId: 1,
        name: 'Stained Glass Flowers',
        bidPrice: 25.0,
        quantity: 2,
        bidDate: '2024-03-01',
        bidnum: 2,
        bidderName: 'gweasley',
        bidderRate: 4.5,
        validDate: '2024-03-07'
    }
  ]

  const statusList=[
    {id:1, name:'Pending'},
    {id:2, name:'Accepteds'},
    {id:3, name: 'Rejected'},
    {id:4, name: 'Canceled'},
    {id:5, name: 'Expired'}
  ]

return (
  <div>
      <Card style={{ marginBottom: 20 }}>
          <Form
            initialValues={{ status: null }}>
  
            <Form.Item label="Status" name="status">
              <Select
                placeholder="Please choose status."
                style={{ width: 120 }}
              >
                {statusList.map(status => <Option key={status.id} value={status.id}>{status.name}</Option>)}
              </Select>
            </Form.Item>
  
            <Form.Item label="Bid Date" name="date">
              <RangePicker></RangePicker>
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Card>
      <Card title={`One Bidding Found:`}> {/*待前文fetch逻辑加入后将One修改为count*/}
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