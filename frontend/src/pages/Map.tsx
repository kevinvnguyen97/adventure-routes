import { useColorMode } from "@components/ui/color-mode";
import { useTrip } from "@hooks/trip";
import {
  ColorScheme,
  ControlPosition,
  Map as GoogleMap,
  MapControl,
  useMap,
} from "@vis.gl/react-google-maps";
import { LuInfo } from "react-icons/lu";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import Loading from "@components/Loading";
// import { toaster } from "@utils/toaster";
import TripDetailsCard from "@components/TripDetailsCard";
import TripDetailsDrawer from "@components/TripDetailsDrawer";
import TripRouteRenderer from "@components/TripRouteRenderer";
import { googleApi } from "@services/axiosInstance";
import type { GoogleRoute, LatLng } from "@shared/types/google";

type GoogleMapCamera = {
  center: { lat: number; lng: number };
  zoom: number;
};

const Map = () => {
  const { tripId = "" } = useParams();
  const { colorMode } = useColorMode();
  const [isLandscape] = useMediaQuery(["(orientation: landscape)"]);
  const [camera, setCamera] = useState<GoogleMapCamera>({
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 10,
  });
  const [routes, setRoutes] = useState<GoogleRoute[]>([]);
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng[]>([]);
  const [areRoutesSelected, setAreRoutesSelected] = useState<boolean[]>([
    true,
    true,
    true,
  ]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [tab, setTab] = useState("details");

  const { trip, isLoading } = useTrip(tripId);

  const { waypoints = [] } = trip || {};

  const map = useMap();

  const getRoutes = useCallback(async () => {
    const { data } = await googleApi.computeRoutes({
      waypoints,
      travelMode: "DRIVING",
    });

    const { response } = data;

    const { routes = [] } = response || {};
    setRoutes(routes);
    return routes;
  }, [waypoints]);

  useEffect(() => {
    if (!map) return;

    const fitRouteInMap = async () => {
      const routes = await getRoutes();

      const route = routes[0];
      if (route.viewport) {
        // Place all advanced markers
        const markerCoordinates = route.legs!.flatMap((leg) => {
          const { startLocation, endLocation } = leg;
          const { latLng: startLatLng } = startLocation;
          const { latitude: startLat, longitude: startLng } = startLatLng;

          const { latLng: endLatLng } = endLocation;
          const { latitude: endLat, longitude: endLng } = endLatLng;

          return [
            { lat: startLat, lng: startLng },
            { lat: endLat, lng: endLng },
          ];
        });

        const uniqueMarkerCoordinates = Array.from(
          new Set(
            markerCoordinates.map((markerCoordinate) =>
              JSON.stringify(markerCoordinate),
            ),
          ),
        ).map((string) => JSON.parse(string));

        setMarkerCoordinates(uniqueMarkerCoordinates);

        // Fit to map view
        const { high, low } = route.viewport;
        const bounds: google.maps.LatLngBoundsLiteral = {
          north: high.latitude,
          south: low.latitude,
          east: high.longitude,
          west: low.longitude,
        };
        if (map) {
          map.fitBounds(bounds);
        }
      }
    };

    fitRouteInMap();
  }, [getRoutes, map]);

  useLayoutEffect(() => {
    if (trip) {
      window.document.title = `${trip.name} - Adventure Routes`;
    }
  }, [trip]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      paddingTop={5}
      display="flex"
      gap={isInfoVisible ? 5 : 0}
    >
      {isLandscape ? (
        <TripDetailsCard
          trip={trip!}
          isInfoVisible={isInfoVisible}
          setIsInfoVisible={setIsInfoVisible}
          routes={routes}
          areRoutesSelected={areRoutesSelected}
          setAreRoutesSelected={setAreRoutesSelected}
          tab={tab}
          setTab={setTab}
        />
      ) : (
        <TripDetailsDrawer
          trip={trip!}
          isInfoVisible={isInfoVisible}
          setIsInfoVisible={setIsInfoVisible}
          routes={routes}
          areRoutesSelected={areRoutesSelected}
          setAreRoutesSelected={setAreRoutesSelected}
          tab={tab}
          setTab={setTab}
        />
      )}
      <GoogleMap
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
        style={{
          width: "100%",
          height: "calc(100vh - 120px)",
          borderRadius: "0.375rem",
        }}
        {...camera}
        colorScheme={
          colorMode === "dark" ? ColorScheme.DARK : ColorScheme.LIGHT
        }
        onCameraChanged={(e) => setCamera(e.detail)}
        streetViewControl
      >
        <TripRouteRenderer
          routes={routes}
          areRoutesSelected={areRoutesSelected}
          markerCoordinates={markerCoordinates}
        />
        <MapControl position={ControlPosition.TOP_LEFT}>
          <IconButton
            onClick={() => setIsInfoVisible(!isInfoVisible)}
            top={2.5}
            bgColor={{ _light: "white", _dark: "#444444" }}
            color={{ _light: "black", _dark: "white" }}
          >
            <LuInfo />
          </IconButton>
        </MapControl>
      </GoogleMap>
    </Box>
  );
};

export default Map;
