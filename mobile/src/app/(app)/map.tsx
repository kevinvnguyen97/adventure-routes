import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "@/components/themed-view";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { googleApi } from "@/services/axiosInstance";
import { decode as decodePolyline } from "@mapbox/polyline";
import { getWaypointCoordinates } from "@shared/utils";
import { RouteColors } from "@shared/constants/google";

const waypoints = [
  "3131 Courtney Ln, South Chicago Heights",
  "3140 Rosiclaire Ct, South Chicago Heights",
];

export default function Map() {
  const colorScheme = useColorScheme();
  const mapRef = useRef<MapView>(null);

  const [waypointCoordinates, setWaypointCoordinates] = useState<LatLng[]>([]);
  const [decodedPolylines, setDecodedPolylines] = useState<Array<LatLng[]>>([]);

  const getDecodedPolylineCoordinates = (encodedPolyline: string): LatLng[] => {
    const decodedPolylines = decodePolyline(encodedPolyline);
    return decodedPolylines.map((decodedPolyline) => ({
      latitude: decodedPolyline[0],
      longitude: decodedPolyline[1],
    }));
  };

  const getRoutesAndMarkers = async () => {
    try {
      const { data } = await googleApi.computeRoutes({ waypoints });
      const { response } = data;
      const { routes = [] } = response || {};
      if (routes.length > 0) {
        // Get all waypoint coordinates
        const waypointCoordinates = getWaypointCoordinates(routes[0]);
        setWaypointCoordinates(waypointCoordinates);

        // Create a route path
        const encodedPolylines = routes.map(
          (route) => route.polyline.encodedPolyline,
        );
        const decodedPolylines = encodedPolylines.map((encodedPolyline) =>
          getDecodedPolylineCoordinates(encodedPolyline),
        );
        setDecodedPolylines(decodedPolylines);
      }
    } catch (error) {
      console.error("Coordinates error:", error);
    }
  };

  const onMapReady = useCallback(async () => {
    await getRoutesAndMarkers();
    if (waypointCoordinates.length > 1 && mapRef.current) {
      mapRef.current.fitToCoordinates(waypointCoordinates, {
        edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
        animated: false,
      });
    }
  }, [waypointCoordinates]);

  useEffect(() => {
    onMapReady();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        userInterfaceStyle={colorScheme as "light" | "dark"}
        onMapReady={async () => {
          await onMapReady();
        }}
      >
        {waypointCoordinates.map((waypointCoordinate, i) => (
          <Marker
            key={i}
            coordinate={waypointCoordinate}
            title={waypoints[i]}
          />
        ))}
        {decodedPolylines.map((decodedPolyline, i) => (
          <Polyline
            key={i}
            coordinates={decodedPolyline}
            strokeColor={RouteColors[i]}
            strokeWidth={6}
          />
        ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelBubble: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    // Add shadow styling here if desired
  },
  labelText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  pin: {
    width: 15,
    height: 15,
    backgroundColor: "red",
    borderRadius: 7.5,
    marginTop: 4,
  },
});
