import axios from "axios";
import { createUsersApi, createTripsApi } from "@shared/api";
import type {
  ComputeRoutesResponse,
  ComputeRoutesArgs,
} from "@shared/types/google";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

export const usersApi = createUsersApi(axiosInstance);
export const tripsApi = createTripsApi(axiosInstance);
export const googleApi = {
  computeRoutes: async (args: ComputeRoutesArgs) =>
    await axiosInstance.post<ComputeRoutesResponse>(
      "/google/compute-routes",
      args,
    ),
};
