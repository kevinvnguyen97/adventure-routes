import axios from "axios";
import { createUsersApi, createTripsApi, createGoogleApi } from "@shared/api";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
export const googleApi = createGoogleApi(axiosInstance);
