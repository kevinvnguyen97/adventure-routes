import type Trip from "@models/trip";
import { useCallback, useEffect, useState } from "react";

export const useTrip = (tripId: string) => {
  const [trip, setTrip] = useState<Trip>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrip = useCallback(async (tripId: string) => {
    const response = await fetch(`/api/trips/${tripId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const trip = (await response.json()) as unknown as Trip;
    setTrip(trip);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrip(tripId);
  }, [tripId, fetchTrip]);

  return { trip, isLoading };
};

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = useCallback(async () => {
    const response = await fetch("/api/trips", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const trips = (await response.json()) as unknown as Trip[];
    setTrips(trips);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return { trips, isLoading };
};
