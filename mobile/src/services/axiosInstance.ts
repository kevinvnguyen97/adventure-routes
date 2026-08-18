import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.86.41:8088",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
