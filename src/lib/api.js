import axios from 'axios';

// Use template string to append /api safely
export const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api`;

const API = axios.create({ baseURL: API_BASE });

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
