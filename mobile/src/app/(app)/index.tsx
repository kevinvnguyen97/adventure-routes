import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import tripsApi from "@/services/tripsApi";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    const getTripsResponse = await tripsApi.getLoggedInUserTrips();

    const { data } = getTripsResponse;

    setTrips(data);
  };

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView>
        <ThemedText>Hello</ThemedText>
        {trips.map((trip) => (
          <ThemedText key={trip._id}>{trip.name}</ThemedText>
        ))}
      </SafeAreaView>
    </ThemedView>
  );
}
