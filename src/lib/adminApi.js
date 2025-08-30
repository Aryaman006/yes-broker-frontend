  // lib/adminApi.js
import axios from "axios";
import { API_BASE } from "./api";

const AdminAPI = axios.create({ baseURL: API_BASE });

// Attach admin token from localStorage
AdminAPI.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auto-logout if unauthorized
AdminAPI.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin"; // redirect to login page
    }
    return Promise.reject(err);
  }
);

export default AdminAPI;
