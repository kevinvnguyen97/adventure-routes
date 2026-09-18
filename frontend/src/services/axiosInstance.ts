import axios from "axios";
import { createUsersApi, createTripsApi, createGoogleApi } from "@shared/api";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
export const googleApi = createGoogleApi(axiosInstance);
