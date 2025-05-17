import React, { useState, CSSProperties, useCallback, useEffect } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { useAdventureRoute } from "/imports/providers/adventureRoutes";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { Loading } from "/imports/ui/pages/Loading";
import { CustomMapInfo } from "/imports/ui/components/CustomMapInfo";

const MAP_CONTAINER_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
};
export const Map = () => {
  const { routeId = "" } = useParams();
  const [isRouteRendered, setIsRouteRendered] = useState(false);

  const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>(
    google.maps.TravelMode.DRIVING
  );

  const { setSnackbar } = useAlertSnackbar();
  const { data: adventureRoute, isLoading: isAdventureRouteLoading } =
    useAdventureRoute(routeId);
  const { route } = adventureRoute || {};
  const { origin = "", waypoints = [], destination = "" } = route || {};

  useEffect(() => {
    if (adventureRoute) {
      window.document.title = adventureRoute.name;
    }
  }, [adventureRoute]);

  const formattedWaypoints = waypoints.map((waypoint) => ({
    location: waypoint,
    stopover: true,
  }));

  const onTravelModeChange = (travelMode: google.maps.TravelMode) => {
    setTravelMode(travelMode);
    setIsRouteRendered(false);
  };
  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
  };
  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (isRouteRendered) {
        return;
      }
      if (result && status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error("Error fetching directions: ", result);
        setSnackbar({
          isOpen: true,
          message: "Error fetching directions",
          severity: "error",
        });
      }
      setIsRouteRendered(true);
    },
    [isRouteRendered, travelMode]
  );

  if (!routeId || isAdventureRouteLoading) {
    return <Loading />;
  }
  if (!adventureRoute) {
    return <div>Error</div>;
  }
  return (
    <Box position="relative" height="calc(100vh - 64px)">
      <CustomMapInfo
        adventureRoute={adventureRoute!}
        directions={directions!}
        travelMode={travelMode}
        setTravelMode={onTravelModeChange}
      />
      <GoogleMap mapContainerStyle={MAP_CONTAINER_STYLE} onLoad={onLoad}>
        {origin && destination && (
          <DirectionsService
            callback={directionsCallback}
            options={{
              origin,
              destination,
              waypoints: formattedWaypoints,
              travelMode,
              drivingOptions: {
                departureTime: new Date(),
                trafficModel: google.maps.TrafficModel.BEST_GUESS,
              },
            }}
          />
        )}
        {directions && <DirectionsRenderer options={{ directions }} />}
      </GoogleMap>
    </Box>
  );
};
