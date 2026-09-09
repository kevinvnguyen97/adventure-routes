import axios from "axios";
import { createUsersApi, createTripsApi } from "@shared/api";

const axiosInstance = axios.create({
  baseURL: "http://192.168.86.41:8088",
  timeout: 5000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
