import React, { useState, CSSProperties, useCallback, useEffect } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";

import { useAdventureRoute } from "/imports/providers/adventureRoutes";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { Loading } from "/imports/ui/pages/Loading";
import { GOOGLE_MAPS_LIBRARIES, SECRETS } from "/imports/constants";

const MAP_CONTAINER_STYLE: CSSProperties = {
  width: "100%",
  height: "calc(100vh - 84px)",
};

export const Map = () => {
  const { routeId = "" } = useParams();
  const [isRouteRendered, setIsRouteRendered] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();

  const { setSnackbar } = useAlertSnackbar();
  const { data: adventureRoute, isLoading: isAdventureRouteLoading } =
    useAdventureRoute(routeId);
  const { route } = adventureRoute || {};
  const { origin = "", waypoints = [], destination = "" } = route || {};
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: SECRETS.public.oauth.googleMapsApiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (adventureRoute) {
      window.document.title = adventureRoute.name;
    }
  }, [adventureRoute]);

  const formattedWaypoints = waypoints.map((waypoint) => ({
    location: waypoint,
    stopover: true,
  }));
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
    [isRouteRendered]
  );

  if (!routeId || isAdventureRouteLoading || !isLoaded) {
    return <Loading />;
  }
  return (
    <GoogleMap mapContainerStyle={MAP_CONTAINER_STYLE} onLoad={onLoad}>
      {origin && destination && (
        <DirectionsService
          callback={directionsCallback}
          options={{
            origin,
            destination,
            waypoints: formattedWaypoints,
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: google.maps.TrafficModel.BEST_GUESS,
            },
          }}
        />
      )}
      {directions && <DirectionsRenderer options={{ directions }} />}
    </GoogleMap>
  );
};
