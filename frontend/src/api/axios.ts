import axios from 'axios';

// สร้าง Axios instance 
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// แนบ token ก่อนที่จะส่ง request 
api.interceptors.request.use(config => { 
  const token = localStorage.getItem('token'); 
  if (token && config.headers) { 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;