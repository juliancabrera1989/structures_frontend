import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response.data);
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
  
};

// export const getUser = async (token) => {
//   const response = await axios.get(`${API_URL}/user`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   console.log(response.data);
//   return response.data;
// };