import { useNavigate } from 'react-router-dom';
import { Table, Space, Card, Form, Button, DatePicker, Select, Tooltip, message } from 'antd';
import { CheckOutlined, CloseOutlined, CommentOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {http} from "../utils/http";

const { Option } = Select;
const { RangePicker } = DatePicker;


export const Bidding =() => {

  const [bidData, setBidData] = useState({
    list: [],
    count: 0
  });
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  });

  const fetchBids = async() => {
    console.log(params)
    const response = await http.get('/getbids', { params });
    const {result, count} = response.data
    setBidData({
      list:result,
      count: count
    })
  };

  useEffect(() => {
    fetchBids();
  },[params])

      // filter function
      const onFinish = (values) => {
        const { date, status } = values
        const _params = {}

        if (status != undefined && status != null) {
          _params.status = status
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
    });
}

  const updateBidStatus = async (values) => {
    const {biddingid, status} = values;
    const formData = new FormData();
    formData.append("status", status);
    await http.post(`updatebidstatus/${biddingid}/`, formData);
  };

  const addOrder = async (values) => {
    const {biddingid} = values;
    await http.post(`addorder/${biddingid}/`);
  };

  const navigate = useNavigate();
  const acceptBid = (data) => {
    const { biddingid } = data
    const values = {
      biddingid: biddingid,
      status: "Accepted"
    }
    updateBidStatus(values);
    addOrder(values);
    navigate('/orders');
    message.success(`Bidding Accepted`);
  };

  const rejectBid = (data) => {
    const { biddingid } = data
    const values = {
      biddingid: biddingid,
      status: "Rejected"
    }
    setParams({
      ...params,
      page: 1
    })
    updateBidStatus(values);
    message.success(`Bidding Rejected`);
  };

  const goCompare = (data) => {
    navigate(`/comparebids/${data.productId}`);
  };

  const columns = [
    {
      title: 'Bidding ID',
      dataIndex: 'biddingid',
      width: 220
    },
    {
      title: 'Bidding Status',
      dataIndex: 'biddingstatus',
      width: 220
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      width: 220
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
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
              onClick={() => acceptBid(data)}
             />
            </Tooltip>
            <Tooltip title="Reject Bid">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => rejectBid(data)}
            />
            </Tooltip>
            <Tooltip title="Compare Pending Bids">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<FileSearchOutlined />}
              onClick={() => goCompare(data)}
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

  const statusList=[
    {id:1, name:'Pending'},
    {id:2, name:'Accepted'},
    {id:3, name: 'Rejected'},
    {id:4, name: 'Canceled'},
    {id:5, name: 'Expired'}
  ]

return (
  <div>
      <Card style={{ marginBottom: 20 }}>
          <Form
            onFinish={onFinish}
            initialValues={{ status: null }}
          >
  
            <Form.Item label="Status" name="status">
              <Select
                placeholder="Please choose status."
                style={{ width: 120 }}
              >
                {statusList.map(status => <Option key={status.id} value={status.name}>{status.name}</Option>)}
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
      <Card title={bidData.count == 1 ? ` One Bid Found:`: `${bidData.count} Bids Found:`}> {/*待前文fetch逻辑加入后将One修改为count*/}
     <Table
      rowKey="id"
      columns={columns}
      dataSource={bidData.list} 
      pagination={
        {
          pageSize: params.per_page,
          total: bidData.count,
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