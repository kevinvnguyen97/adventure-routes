import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "@/components/themed-view";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

const ADDRESSES = ["Chicago", "Los Angeles"];

export default function Map() {
  const colorScheme = useColorScheme();
  const mapRef = useRef<MapView>(null);

  const [coordinate0, setCoordinate0] = useState<{
    latitude: number;
    longitude: number;
    id: number;
  }>({});
  const [coordinate1, setCoordinate1] = useState<{
    latitude: number;
    longitude: number;
    id: number;
  }>({});

  console.log(coordinate0, coordinate1);

  const getCoordinates = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        console.error("Coordinate access denied");
        return;
      }

      const results = await Promise.all([
        Location.geocodeAsync(ADDRESSES[0]),
        Location.geocodeAsync(ADDRESSES[1]),
      ]);

      if (results[0].length > 0) {
        const { latitude, longitude } = results[0][0];
        setCoordinate0({ latitude, longitude, id: 0 });
      }

      if (results[1].length > 0) {
        const { latitude, longitude } = results[1][0];
        setCoordinate1({ latitude, longitude, id: 1 });
      }
    } catch (error) {
      console.error("Coordinates error:", error);
    }
  };

  const zoomToAllCoordinates = () => {
    mapRef.current?.fitToCoordinates([coordinate0, coordinate1], {
      edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
      animated: false,
    });
  };

  useEffect(() => {
    getCoordinates();
  }, [getCoordinates]);

  useEffect(() => {
    zoomToAllCoordinates();
  }, [zoomToAllCoordinates]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        // zoomControlEnabled
        // zoomEnabled
        // zoomTapEnabled
        userInterfaceStyle={colorScheme as "light" | "dark"}
        onMapReady={zoomToAllCoordinates}
      >
        <Marker key={0} coordinate={coordinate0} title={ADDRESSES[0]} />
        <Marker key={1} coordinate={coordinate1} title={ADDRESSES[1]} />
        <MapViewDirections
          precision="high"
          origin={coordinate0}
          destination={coordinate1}
          apikey={"AIzaSyAEqs54WFsIR5lPPDK9rxccCY5DM3VQ-Gs"}
          strokeColor="green"
          strokeWidth={5}
          mode="DRIVING"
        />
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
