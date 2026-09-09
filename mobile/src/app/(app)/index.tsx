import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { tripsApi } from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Trip from "@shared/models/trip";

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);

  const getTrips = async () => {
    const getTripsResponse = await tripsApi.getLoggedInUserTrips();

    const { data } = getTripsResponse;

    const { trips = [] } = data;

    setTrips(trips);
  };

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemedText>Hello</ThemedText>
        {trips.map((trip) => (
          <ThemedText key={trip._id as unknown as string}>
            {trip.name}
          </ThemedText>
        ))}
      </SafeAreaView>
    </ThemedView>
  );
}
