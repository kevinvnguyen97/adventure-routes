import type {
  GetTripResponse,
  GetTripsResponse,
  ServerResponse,
  UpsertTripArgs,
} from "../types/api";
import type { AxiosInstance } from "axios";

const tripsApi = (axiosInstance: AxiosInstance) => {
  return {
    getTrip: async (tripId: string) =>
      await axiosInstance.get<GetTripResponse>(`/trips/${tripId}`),
    getLoggedInUserTrips: async () =>
      await axiosInstance.get<GetTripsResponse>("/trips"),
    upsertTrip: async (args: UpsertTripArgs) => {
      const { tripId, ...tripForm } = args;
      return await axiosInstance.post<ServerResponse>(
        `/trips${tripId ? `/${tripId}` : ""}`,
        tripForm,
      );
    },
    deleteTrip: async (tripId: string) =>
      await axiosInstance.delete<ServerResponse>(`/trips/${tripId}`),
  };
};

export default tripsApi;
