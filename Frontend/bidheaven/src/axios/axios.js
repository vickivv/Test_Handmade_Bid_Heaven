import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);

export default instance;
