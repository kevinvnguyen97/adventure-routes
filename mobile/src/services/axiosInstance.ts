import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
