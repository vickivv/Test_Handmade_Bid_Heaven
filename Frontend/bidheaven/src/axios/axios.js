import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

instance.interceptors.request.use(
  function (config) {
    
    const userToken = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken')
    const token = adminToken ? adminToken : userToken;
 
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
      console.log('Token:', token); 
    }
    return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);

export default instance;
