import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../axios/axios.js';

const { confirm } = Modal;

const User: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin_get_all_users');
        if (!response.ok) {
          console.error(`HTTP Error Response: ${response.status} ${response.statusText}`);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Assuming the backend returns an array of user data
      } catch (error) {
        console.error("There was a problem with fetching data: ", error);
      }
    };

    fetchData();
  }, []);


const handleDelete = (userID) => {
    confirm({
        title: 'Are you sure you want to delete this user?',
        icon: <ExclamationCircleOutlined />,
        content: `UserID: ${userID}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            // 调用删除用户的API
            axiosInstance.delete(`/api/delete_user/${userID}`)
                .then(() => {
                    console.log('Deleted:', userID);
                    // 删除成功后从列表中移除这个用户
                    setUsers(prevUsers => prevUsers.filter(user => user.UserID !== userID));
                    alert("User successfully deleted!");
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                    alert("Failed to delete user.");
                });
        }
    });
};


  const columns = [
    {
      title: 'User ID',
      dataIndex: 'UserID',
      key: 'UserID',
    },
    {
      title: 'First Name',
      dataIndex: 'Fname',
      key: 'Fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'Lname',
      key: 'Lname',
    },
    {
      title: 'Orders',
      dataIndex: 'OrderCount',
      key: 'OrderCount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.UserID)}>
          Delete
        </Button>
      ),
    },
  ];


  return (
    <>
      <h5>Bidheaven Total Users: {users.length}</h5>
      <Table dataSource={users} columns={columns} rowKey="UserID" />
    </>
  );
};

const ManageUsers: React.FC = () => (
  <>

    <User />
  </>
);

export default ManageUsers;
