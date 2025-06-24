import type Trip from "@models/trip";
import { toaster } from "@utils/toaster";
import { useCallback, useEffect, useState } from "react";

export type TripFormArgs = {
  name: string;
  description?: string;
  priceCategory: number;
  activities: string[];
  waypoints: string[];
};
export type UpsertTripArgs = {
  tripId?: string;
  tripForm: TripFormArgs;
};

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

  const refetchTrips = useCallback(async () => {
    const response = await fetch("/api/trips", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const trips = (await response.json()) as unknown as Trip[];
      setTrips(trips);
    }
    setIsLoading(false);
  }, [setTrips, setIsLoading]);

  const upsertTrip = async (args: UpsertTripArgs) => {
    const { tripId, tripForm } = args;
    const { name, description, priceCategory, activities, waypoints } =
      tripForm;

    if (tripId) {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          priceCategory,
          activities,
          waypoints,
        }),
      });
      switch (response.status) {
        case 200:
          toaster.create({
            title: `Code ${response.status} (${response.statusText})`,
            description: `Trip "${name}" updated successfully`,
            type: "success",
            closable: true,
          });
          break;
        default:
          toaster.create({
            title: `Error ${response.status} (${response.statusText})`,
            description: "Trip cannot be updated",
            type: "error",
            closable: true,
          });
          break;
      }
    } else {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          priceCategory,
          activities,
          waypoints,
        }),
      });

      switch (response.status) {
        case 200:
          toaster.create({
            title: `Code ${response.status} (${response.statusText})`,
            description: `Trip "${name}" updated successfully`,
            type: "success",
            closable: true,
          });
          break;
        default:
          toaster.create({
            title: `Error ${response.status} (${response.statusText})`,
            description: "Trip cannot be updated",
            type: "error",
            closable: true,
          });
          break;
      }
    }
    refetchTrips();
  };

  const deleteTrip = async (tripId: string) => {
    const response = await fetch(`/api/trips/${tripId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    switch (response.status) {
      case 200:
        toaster.create({
          title: `Code ${response.status} (${response.statusText})`,
          description: `Trip deleted successfully`,
          type: "success",
          closable: true,
        });
        break;
      default:
        toaster.create({
          title: `Error ${response.status} (${response.statusText})`,
          description: "Trip cannot be deleted",
          type: "error",
          closable: true,
        });
        break;
    }
    refetchTrips();
  };

  useEffect(() => {
    refetchTrips();
  }, [refetchTrips]);

  return { trips, isLoading, upsertTrip, deleteTrip };
};
