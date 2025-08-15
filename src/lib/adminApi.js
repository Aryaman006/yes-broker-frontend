import axios from 'axios';
import { API_BASE } from './api'; // make sure this is the fixed version

const AdminAPI = axios.create({ baseURL: API_BASE });

AdminAPI.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken'); // admin token from localStorage
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default AdminAPI;
