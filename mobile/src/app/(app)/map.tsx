import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "@/components/themed-view";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default function Map() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        userInterfaceStyle={colorScheme as "light" | "dark"}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
