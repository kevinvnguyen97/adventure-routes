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
import type { AxiosInstance } from "axios";
import { ComputeRoutesArgs, ComputeRoutesResponse } from "../types/google";

export const createUsersApi = (axiosInstance: AxiosInstance) => {
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

export const createTripsApi = (axiosInstance: AxiosInstance) => {
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

export const createGoogleApi = (axiosInstance: AxiosInstance) => {
  return {
    computeRoutes: async (args: ComputeRoutesArgs) =>
      await axiosInstance.post<ComputeRoutesResponse>(
        "/google/compute-routes",
        args,
      ),
  };
};
