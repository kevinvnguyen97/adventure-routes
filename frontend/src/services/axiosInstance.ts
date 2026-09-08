import axios from "axios";
// Todo: Solve import issue with @shared/api. Currently, it is not working with the bundler module resolution strategy.
// @ts-expect-error: See above comment
import { createUsersApi, createTripsApi } from "../../shared/src/api";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
