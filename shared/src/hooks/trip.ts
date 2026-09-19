import { TripsApiFunctions } from "../api";
import type Trip from "../models/trip";
import type { UpsertTripArgs } from "../types/api";
import { useCallback, useEffect, useState } from "react";

type UseTripArgs = {
  tripId: string;
  tripsAxiosApi: TripsApiFunctions;
};
export const useTrip = (args: UseTripArgs) => {
  const { tripId, tripsAxiosApi } = args;
  const [trip, setTrip] = useState<Trip>();
  const [isLoading, setIsLoading] = useState(true);

  const getTrip = useCallback(async (tripId: string) => {
    const { data } = await tripsAxiosApi.getTrip(tripId);

    const { trip, success } = data;

    if (success && trip) {
      setTrip(data.trip);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTrip(tripId);
  }, [tripId, getTrip]);

  return { trip, isLoading };
};

type UseTripsArgs = {
  tripsAxiosApi: TripsApiFunctions;
};
export const useTrips = (args: UseTripsArgs) => {
  const { tripsAxiosApi } = args;
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTrips = useCallback(async () => {
    const { data, status, statusText } =
      await tripsAxiosApi.getLoggedInUserTrips();
    const { trips = [], success, message } = data;
    if (success) {
      setTrips(trips);
    }
    setIsLoading(false);

    return { data, trips, success, isLoading, message, status, statusText };
  }, [setTrips, setIsLoading]);

  const upsertTrip = async (args: UpsertTripArgs) => {
    const { data, status, statusText } = await tripsAxiosApi.upsertTrip(args);

    const { success, message } = data;

    getTrips();

    return { data, status, statusText, success, message };
  };

  const deleteTrip = async (tripId: string) => {
    const { data, status, statusText } = await tripsAxiosApi.deleteTrip(tripId);

    const { success, message } = data;

    getTrips();

    return { data, status, statusText, success, message };
  };

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return { trips, isLoading, upsertTrip, deleteTrip };
};
