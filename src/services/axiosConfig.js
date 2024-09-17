import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../hooks/useAuth';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const { auth, logout } = useAuth();
    const token = auth.token;

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;