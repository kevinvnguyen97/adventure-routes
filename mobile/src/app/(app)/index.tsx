import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRef, useState } from "react";
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
import TripFormBottomSheet from "@/components/trip-form-bottomsheet";
import { useTrips } from "@shared/hooks/trip";
import { tripsApi } from "@/services/axiosInstance";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useRouter();
  const { trips, deleteTrip, upsertTrip } = useTrips({
    tripsAxiosApi: tripsApi,
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const textInputStyle: StyleProp<TextStyle> = [
    styles.textInput,
    {
      backgroundColor: theme.fieldTextBackground,
      color: theme.fieldText,
      flex: 1,
    },
  ];

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const goToMap = (tripId: string) => {
    navigate.navigate({ pathname: "/map", params: { tripId } });
  };

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
              onPress={openBottomSheet}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressedButton : {},
              ]}
            >
              <ThemedText
                style={{ textAlign: "center" }}
                onPress={openBottomSheet}
              >
                +
              </ThemedText>
            </Pressable>
          </ThemedView>
          {trips.map((trip) => (
            <TripCard
              key={trip._id.toString()}
              trip={trip}
              goToMap={() => goToMap(trip._id.toString())}
            />
          ))}
        </ThemedView>
      </SafeAreaView>
      <TripFormBottomSheet
        bottomSheetRef={bottomSheetModalRef}
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
