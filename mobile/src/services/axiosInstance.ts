import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: "http://192.168.86.29:8088",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
