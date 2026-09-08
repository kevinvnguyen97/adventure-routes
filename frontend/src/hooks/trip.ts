import { tripsApi } from "@services/axiosInstance";
import type Trip from "@shared/models/trip";
import type { UpsertTripArgs } from "@shared/types/api";
import { toaster } from "@utils/toaster";
import { useCallback, useEffect, useState } from "react";

export const useTrip = (tripId: string) => {
  const [trip, setTrip] = useState<Trip>();
  const [isLoading, setIsLoading] = useState(true);

  const getTrip = useCallback(async (tripId: string) => {
    const { data } = await tripsApi.getTrip(tripId);

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

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTrips = useCallback(async () => {
    const { data } = await tripsApi.getLoggedInUserTrips();
    const { trips = [], success } = data;
    if (success) {
      setTrips(trips);
    }
    setIsLoading(false);
  }, [setTrips, setIsLoading]);

  const upsertTrip = async (args: UpsertTripArgs) => {
    const { data, status, statusText } = await tripsApi.upsertTrip(args);

    const { success, message } = data;

    toaster.create({
      title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });

    getTrips();
  };

  const deleteTrip = async (tripId: string) => {
    const { data, status, statusText } = await tripsApi.deleteTrip(tripId);

    const { success, message } = data;

    toaster.create({
      title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });

    getTrips();
  };

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return { trips, isLoading, upsertTrip, deleteTrip };
};
