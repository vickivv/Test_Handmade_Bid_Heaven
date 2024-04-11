import React, { useContext, useState, useEffect } from 'react';
import { Table, Modal ,Checkbox} from 'antd';
import { MailOutlined ,DeleteOutlined} from '@ant-design/icons';
import { AuthContext } from '../../Context/AuthContext';
import { MessageContext } from '../../Context/MessageContext';
import '../../../Styles/Sent.css';
import Footer from '../../Homepage/Footer';
import Sidebar from '../../Messages/SideBar';
import Header from '../../Homepage/Header';
import Nav from '../nav';

function Sent() {
  const { user } = useContext(AuthContext);
  const { messages, fetchMessages, isLoading, selectMessage, unselectMessage, selectedMessages,setSelectedMessages
    ,deleteAllMessages,
    deleteSeletedMessages
  
  } = useContext(MessageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMessage, setActiveMessage] = useState(null);
  const messagesPerPage = 10;
  const[selectedRowKeys,setSelectedRowKeys] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    if (user && user.token) {
      fetchMessages();
    } else {
      console.error('User is not logged in');
    }
  }, [fetchMessages, user]);

  const getReceiverName = (message) => {
    if (message && message.receiver_email && typeof message.receiver_email === 'string') {
      return message.receiver_email.includes('@handmade.com') ? 'Admin' : message.receiver_email;
    }
    return ' ';
  };


  const getSubjectInfo = (message) => {
    let subjectInfo = `About ${message.subject_type}`;
    if (message.subject_type === 'Product') {
    
      subjectInfo += `  ${message.product_info}`;
    } else if (message.subject_type === 'Order') {
      subjectInfo += `  ${message.order_info}`;
    }
    return subjectInfo;
  };

  // Filter messages by the current user's email
  const displayedMessages = messages.filter((message) => user.email === message.sender_email);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  const data = displayedMessages.slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage).map(msg => ({
    key: msg.messageId,
    receiver_email: getReceiverName(msg),
    subject: getSubjectInfo(msg),
    create_date: formatDate(msg.create_date),
    content: msg.content,
    showDeleteIcon,
  }));

  const columns = [
    {
      title: 'To',
      dataIndex: 'receiver_email',
      key: 'receiver_email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Date',
      dataIndex: 'create_date',
      key: 'create_date',
    },
    {
      title: '',
      dataIndex: 'showDeleteIcon',
      key: 'showDeleteIcon',
      render: (showDeleteIcon, record) => (
        showDeleteIcon ? (
          <span
            className="delete-icon"
            onClick={() => setShowDeleteModal(!showDeleteModal)}
          >
            <DeleteOutlined />
          </span>
        ) : null
      ),
    },

  ];


  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('Selected Row Keys:', selectedRowKeys);
      console.log('Selected Rows:', selectedRows);
  
      // if selected row >0 then show delete icon

      setShowDeleteIcon(selectedRowKeys.length >0);


      if (selectedRowKeys.length === data.length) {
        const allMessageIds = data.map((message) => message.key);
        selectMessage(allMessageIds);
        setSelectedRowKeys(allMessageIds);
      } 
      //only select one row

    else if (selectedRows.length === 1) {
  const selectedMessageId = selectedRows[0].key;
  if (selectedMessages.includes(selectedMessageId)) {
    unselectMessage(selectedMessageId);
  } else {
    selectMessage(selectedMessageId);
  }
  setSelectedRowKeys(selectedRowKeys);
}
      else {
        const selectedMessageIds = selectedRows.map((row) => row.key);
        selectMessage(selectedMessageIds);
        unselectMessage(messages.filter((message) => !selectedMessageIds.includes(message.key)).map((message) => message.key));
        setSelectedRowKeys(selectedRowKeys);
      }
    },
    getCheckboxProps: (record) => ({
      disabled: false,
    }),
    // add "Select All" and "Select None" 
    selections: [
      {
        key: 'select-all',
        text: 'Select All',
        onSelect: () => {
          const allMessageIds = data.map((message) => message.key);
          selectMessage(allMessageIds);
          setSelectedRowKeys(allMessageIds);
        },
      },
      {
        key: 'select-none',
        text: 'Select None',
        onSelect: () => {
          unselectMessage(selectedMessages);
          setSelectedRowKeys([]);
        },
      },
    ],
  };


const handleDeleteSelected = async () => {
  try {
    await deleteSeletedMessages(data.key);
    setSelectedRowKeys([]);
    selectMessage([]);
    setShowDeleteModal(true);
    alert("Successfully delete the message.")
  } catch (error) {
    console.error('Error deleting messages:', error);
  }
};

const handleDeleteAll = async () => {
  try {
    await deleteAllMessages();
    setSelectedRowKeys([]);
    selectMessage([]);
  } catch (error) {
    console.error('Error deleting all messages:', error);
  }
};


  const onRow = (record) => {
    return {
      onClick: () => {
        setActiveMessage(record);
      },
    };
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.token) {
    return <div>Please log in to view your sent messages.</div>;
  }


 
  const handleDeleteConfirm = async () => {
    try {
      handleDeleteSelected()
      setShowDeleteModal(false); 
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };



  return (
    <>
      <Header />
      <Nav />
      <div className="app-container">
        <Sidebar />
        <div className="sent-container">
          <div className="sent-header">
            <div className="sent-title">
              <MailOutlined /> Sent
            </div>
          </div>
          <Table
          style={{ width: '100%' }}

          rowSelection ={{
            type:'checkbox',
            ...rowSelection,
            
          }}
            columns={columns}
            dataSource={data}
            pagination={{
              current: currentPage,
              pageSize: messagesPerPage,
              total: displayedMessages.length,
              showSizeChanger: false, 
              style: { 
                display: 'flex', 
                justifyContent: 'center',
                width: '100%',
              }
            }}
            onRow={onRow}
          />
          {activeMessage && (
            <Modal
              title="Message Content"
              visible={!!activeMessage}
              onCancel={() => setActiveMessage(null)}
              footer={null}
            >
              <p>To: {activeMessage.receiver_email}</p>
              <p>Message: {activeMessage.content}</p>
            </Modal>
          )}
 <Modal
      visible={showDeleteModal}
      title="Confirm Delete"
      onOk={handleDeleteConfirm}
      onCancel={handleDeleteCancel}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete the selected messages?</p>
    </Modal>


        </div>
      </div>
      <Footer />
    </>
  );
}

export default Sent;
