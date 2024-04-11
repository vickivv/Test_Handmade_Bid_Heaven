import React, { createContext, useState, useCallback,useEffect ,useContext} from 'react';
import instance from '../../axios/axios.js';
import { useAuth } from '../Context/AuthContext.js';


export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({ from_email: '' }); 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const token = localStorage.getItem('token');

  const [selectedMessages, setSelectedMessages] = useState([]);


 
  useEffect(() => {
    console.log("Checking user in MessageProvider:", user);
    if (user?.email) {
      console.log("Setting email in message state:", user.email);
      setMessage((prevMessage) => ({ ...prevMessage, from_email: user.email }));
    }
  }, [user]);
  
  
// fetch message from backend GET
  const fetchMessages = useCallback(async () => {
    console.log('User ID:', user?.userId);
    console.log('Token:', token);

    if (!user || !user.userId) {
      console.error('Authentication error: No user ID available.');
      setError('Authentication error: You must be logged in to view messages.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Token sent to backend:', token);
      const response = await instance.get(`/api/messages/${user.userId}/`);
      console.log('API response at frontend :', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setMessages(response.data);
      }else {
        console.log('No messages found for the user');
        setMessages([]);
      }
      setError(null); 
    } catch (error) {
      console.error('Error fetching sent messages:', error);
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.data.error}`);
      } else {
        setError('Error fetching messages: Network error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, user]); 




// Delete message by message id 
    // const deleteSeletedMessages = async (messageId) => {
    //   try {
    //     await instance.delete(`/api/messages/delete/${messageId}/`);
    //     setMessages(messages.filter((message) => message.id !== messageId));
    //     setSelectedMessages(selectedMessages.filter((id) => id !== messageId));
    //     setSelectedRowKeys(selectedRowKeys.filter((key) => key !== messageId));
    //     setError(null);
    //   } catch (error) {
    //     console.error('Error deleting message:', error);
    //     if (error.response) {
    //       setError(`Error ${error.response.status}: ${error.response.data.error}`);
    //     } else {
    //       setError('Error deleting message: Network error');
    //     }
    //   }
    // };

    const deleteSeletedMessages = async () => {
      try {
        await Promise.all(
          selectedMessages.map((messageId) =>
            instance.delete(`/api/messages/delete/${messageId}/`)
          )
        );
        setMessages(messages.filter((message) => !selectedMessages.includes(message.messageId)));
        setSelectedMessages([]);
        setError(null);
      } catch (error) {
        console.error('Error deleting messages:', error);
        if (error.response) {
          setError(`Error ${error.response.status}: ${error.response.data.error}`);
        } else {
          setError('Error deleting messages: Network error');
        }
      }
    };


// delete all messages

const deleteAllMessages = async () => {
  try {
    await Promise.all(
      selectedMessages.map((messageId) =>
        instance.delete(`/api/messages/delete/${messageId}/`)
      )
    );
    setMessages(messages.filter((message) => !selectedMessages.includes(message.id)));
    setSelectedMessages([]);
    setSelectedRowKeys([]);
    setError(null);
  } catch (error) {
    console.error('Error deleting messages:', error);
    if (error.response) {
      setError(`Error ${error.response.status}: ${error.response.data.error}`);
    } else {
      setError('Error deleting messages: Network error');
    }
  }
};

//selectmessage
  const selectMessage = (messageId) => {
    setSelectedMessages((prevSelectedMessages) => {
      if (prevSelectedMessages.includes(messageId)) {
        return prevSelectedMessages;
      }
      return [...prevSelectedMessages, messageId];
    });
  };
  
  //un select message
  const unselectMessage = (messageId) => {
    setSelectedMessages((prevSelectedMessages) =>
      prevSelectedMessages.filter((id) => id !== messageId)
    );
  };

  //clear Select Messages
  const clearSelectedMessages = () => {
    setSelectedMessages([]);
  };



//Clear Messages
  const clearMessages = () => {
    setMessages([]);
  };

  // update message
  const updateMessage = (newMessageData) => {
  
    if (newMessageData.from_email !== undefined) {
      setMessage((prevMessage) => {
        const updatedMessage = { ...prevMessage, ...newMessageData };
        console.log('Message updated to:', updatedMessage);  
        return updatedMessage;
      });
    } else {
      console.log('Attempted to update message with undefined from_email');
    }
  };
  
  

  // Provide all the state and functions through context
  const contextValue = {
    messages,
    fetchMessages, 
    deleteSeletedMessages,
    deleteAllMessages,


    clearMessages,
    message,
    updateMessage,
    error,
    isLoading,
    setError,
    selectedMessages,
    selectMessage,
    unselectMessage,
    clearSelectedMessages,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

