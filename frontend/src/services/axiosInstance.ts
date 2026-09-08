import axios from "axios";
import createUsersApi from "@shared/api/usersApi";
import createTripsApi from "@shared/api/tripsApi";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
