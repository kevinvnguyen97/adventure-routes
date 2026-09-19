import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import TripCard from "@/components/trip-card";
import TripFormModal from "@/components/trip-form-modal";
import { useTrips } from "@/hooks/trip";

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useRouter();
  const { trips, deleteTrip, upsertTrip } = useTrips();

  const [isTripModalVisible, setIsTripModalVisible] = useState(false);

  const textInputStyle: StyleProp<TextStyle> = [
    styles.textInput,
    {
      backgroundColor: theme.fieldTextBackground,
      color: theme.fieldText,
      flex: 1,
    },
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
              onPress={() => setIsTripModalVisible(true)}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressedButton : {},
              ]}
            >
              <ThemedText style={{ textAlign: "center" }}>+</ThemedText>
            </Pressable>
          </ThemedView>
          {trips.map((trip) => (
            <TripCard key={trip._id.toString()} trip={trip} />
          ))}
        </ThemedView>
      </SafeAreaView>
      <TripFormModal
        isVisible={isTripModalVisible}
        onClose={() => setIsTripModalVisible(false)}
        upsertTrip={upsertTrip}
      />
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
