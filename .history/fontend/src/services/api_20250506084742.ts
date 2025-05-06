import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/api', // Spring Boot API URL
  withCredentials: true // Cho phép gửi cookie/session
});

// Xử lý lỗi chung
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;