import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { tripsApi } from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Trip from "@shared/models/trip";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);

  const getTrips = async () => {
    const getTripsResponse = await tripsApi.getLoggedInUserTrips();

    const { data } = getTripsResponse;

    const { trips = [] } = data;

    setTrips(trips);
  };

  const tripCardContainerStyle: StyleProp<ViewStyle> = [
    styles.tripCardContainer,
    { backgroundColor: theme.backgroundElement },
  ];

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  const textInputStyle: StyleProp<TextStyle> = [
    styles.textInput,
    { backgroundColor: "white", color: theme.fieldTextBackground, flex: 1 },
  ];

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <SafeAreaView>
        <ThemedView style={{ gap: 10 }}>
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Search for Trip" style={textInputStyle} />
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressedButton : {},
              ]}
            >
              <ThemedText style={{ textAlign: "center" }}>+</ThemedText>
            </Pressable>
          </ThemedView>
          {trips.map(({ _id, name }) => (
            <Pressable style={tripCardContainerStyle} onPress={() => {}}>
              <View>
                <ThemedText
                  key={_id.toString()}
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  {name}
                </ThemedText>
              </View>
              <View>
                <ThemedText>X</ThemedText>
              </View>
            </Pressable>
          ))}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tripCardContainer: {
    padding: 10,
    borderRadius: 5,
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  button: {
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#f97316",
    borderRadius: 5,
    width: 50,
    height: 50,
  },
  pressedButton: {
    opacity: 0.5,
  },
});
