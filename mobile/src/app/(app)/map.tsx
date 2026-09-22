import { StyleSheet, Text, useColorScheme } from "react-native";
import { ThemedView } from "@/components/themed-view";
import MapView, {
  LatLng,
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { googleApi, tripsApi } from "@/services/axiosInstance";
import { decode as decodePolyline } from "@mapbox/polyline";
import { getWaypointCoordinates } from "@shared/utils";
import { RouteColors } from "@shared/constants/color";
import { useLocalSearchParams } from "expo-router";
import { useTrip } from "@shared/hooks/trip";

export default function Map() {
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const { trip } = useTrip({ tripId, tripsAxiosApi: tripsApi });

  const { waypoints = [] } = trip || {};

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

  const fitToCoordinates = (waypointCoordinates: LatLng[]) => {
    if (waypointCoordinates.length > 1 && mapRef.current) {
      mapRef.current.fitToCoordinates(waypointCoordinates, {
        edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
        animated: false,
      });
    }
  };

  const getRoutesAndMarkers = useCallback(async () => {
    try {
      if (waypoints.length > 1) {
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

        fitToCoordinates(waypointCoordinates);
      }
    } catch (error) {
      console.error("Coordinates error:", error);
    }
  }, [
    waypoints,
    setWaypointCoordinates,
    setDecodedPolylines,
    fitToCoordinates,
  ]);

  useEffect(() => {
    const getRouteData = async () => {
      return await getRoutesAndMarkers();
    };
    getRouteData();
  }, [getRoutesAndMarkers]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        zoomControlEnabled
        zoomEnabled
        zoomTapEnabled
        userInterfaceStyle={colorScheme as "light" | "dark"}
        loadingEnabled
      >
        {waypointCoordinates.map((waypointCoordinate, i) => (
          <Marker
            key={i}
            coordinate={waypointCoordinate}
            title={waypoints[i]}
            tracksViewChanges={false}
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
