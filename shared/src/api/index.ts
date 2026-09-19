/// <reference types="google.maps" />
import type {
  GetAllUsersResponse,
  GetProfileResponse,
  GetTripResponse,
  GetTripsResponse,
  ServerResponse,
  SignInArgs,
  SignInResponse,
  SignUpArgs,
  UpsertTripArgs,
} from "../types/api";
import type { AxiosInstance, AxiosResponse } from "axios";
import { ComputeRoutesArgs, ComputeRoutesResponse } from "../types/google";

type SignInAxiosResponse = AxiosResponse<SignInResponse, any, {}, any>;
type StandardAxiosResponse = AxiosResponse<ServerResponse, any, {}, any>;
type GetProfileAxiosResponse = AxiosResponse<GetProfileResponse, any, {}, any>;
type GetAllUsersAxiosResponse = AxiosResponse<
  GetAllUsersResponse,
  any,
  {},
  any
>;

export type UsersApiFunctions = {
  signIn: (args: SignInArgs) => Promise<SignInAxiosResponse>;
  signUp: (args: SignUpArgs) => Promise<StandardAxiosResponse>;
  signOut: () => Promise<StandardAxiosResponse>;
  getProfile: () => Promise<GetProfileAxiosResponse>;
  getAllUsers: () => Promise<GetAllUsersAxiosResponse>;
};
export const createUsersApi = (
  axiosInstance: AxiosInstance,
): UsersApiFunctions => {
  return {
    signIn: async (args: SignInArgs) =>
      await axiosInstance.post<SignInResponse>("/users/sign-in", args),
    signUp: async (args: SignUpArgs) =>
      await axiosInstance.post<ServerResponse>("/users/sign-up", args),
    signOut: async () =>
      await axiosInstance.post<ServerResponse>("/users/sign-out"),
    getProfile: async () =>
      await axiosInstance.get<GetProfileResponse>("/users/profile"),
    getAllUsers: async () =>
      await axiosInstance.get<GetAllUsersResponse>("/users"),
  };
};

type GetTripAxiosResponse = AxiosResponse<GetTripResponse, any, {}, any>;
type GetTripsAxiosResponse = AxiosResponse<GetTripsResponse, any, {}, any>;

export type TripsApiFunctions = {
  getTrip: (tripId: string) => Promise<GetTripAxiosResponse>;
  getLoggedInUserTrips: () => Promise<GetTripsAxiosResponse>;
  upsertTrip: (args: UpsertTripArgs) => Promise<StandardAxiosResponse>;
  deleteTrip: (tripId: string) => Promise<StandardAxiosResponse>;
};
export const createTripsApi = (
  axiosInstance: AxiosInstance,
): TripsApiFunctions => {
  return {
    getTrip: async (tripId: string) =>
      await axiosInstance.get<GetTripResponse>(`/trips/${tripId}`),
    getLoggedInUserTrips: async () =>
      await axiosInstance.get<GetTripsResponse>("/trips"),
    upsertTrip: async (args: UpsertTripArgs) => {
      const { tripId, ...tripForm } = args;
      if (tripId) {
        return await axiosInstance.put<ServerResponse>(
          `/trips/${tripId}`,
          tripForm,
        );
      } else {
        return await axiosInstance.post<ServerResponse>("/trips", tripForm);
      }
    },
    deleteTrip: async (tripId: string) =>
      await axiosInstance.delete<ServerResponse>(`/trips/${tripId}`),
  };
};

type ComputeRoutesAxiosResponse = AxiosResponse<
  ComputeRoutesResponse,
  any,
  {},
  any
>;
export type GoogleApiFunctions = {
  computeRoutes: (
    args: ComputeRoutesArgs,
  ) => Promise<ComputeRoutesAxiosResponse>;
};
export const createGoogleApi = (axiosInstance: AxiosInstance) => {
  return {
    computeRoutes: async (args: ComputeRoutesArgs) =>
      await axiosInstance.post<ComputeRoutesResponse>(
        "/google/compute-routes",
        args,
      ),
  };
};
