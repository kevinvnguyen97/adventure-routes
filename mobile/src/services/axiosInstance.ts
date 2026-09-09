import axios from "axios";
// Todo: Solve import issue with @shared/api. Currently, it is not working with the bundler module resolution strategy.
// @ts-ignore: See above comment
import { createUsersApi, createTripsApi } from "@shared/api";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
