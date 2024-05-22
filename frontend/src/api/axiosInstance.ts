// src/api/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  process.env.REACT_APP_API_URL, // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
