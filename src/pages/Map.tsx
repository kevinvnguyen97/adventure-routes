import { useColorMode } from "@components/ui";
import { darkGoogleMapCss } from "@constants/google";
import { useTrip } from "@hooks/trip";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Map = () => {
  const { tripId = "" } = useParams();
  const { colorMode } = useColorMode();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >();
  const [isDirectionsRendered, setIsDirectionsRendered] = useState(false);

  console.log("Map:", map);

  const { trip, isLoading } = useTrip(tripId);
  const { waypoints = [] } = trip || {};
  const origin = waypoints[0];
  const stops: google.maps.DirectionsWaypoint[] =
    waypoints.length <= 2
      ? []
      : waypoints
          .toSpliced(0, 1)
          .toSpliced(waypoints.length - 2)
          .map((waypoint) => ({
            location: waypoint,
            stopover: true,
          }));
  const destination = waypoints[waypoints.length - 1];

  const onMapLoad = (map: google.maps.Map) => {
    console.log("Map loaded:", map);
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  };
  const onMapUnmount = () => {
    console.log("Map unmounted");
    setMap(null);
  };

  const directionsServiceCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (isDirectionsRendered) {
      return;
    } else if (status === "OK" && !isDirectionsRendered) {
      console.log("Directions response:", response);
      setDirections(response as google.maps.DirectionsResult | undefined);
      setIsDirectionsRendered(true);
    } else {
      console.error("Error fetching directions:", status);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <GoogleMap
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
      mapContainerStyle={{ width: "100%", height: "700px" }}
      options={{
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DEFAULT,
        },
        backgroundColor:
          colorMode === "dark" ? "var(--chakra-colors-bg-panel)" : "white",
        styles: colorMode === "dark" ? darkGoogleMapCss : undefined,
      }}
    >
      <DirectionsService
        options={{
          origin,
          waypoints: stops,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        }}
        callback={directionsServiceCallback}
      />
      {directions?.routes.map((route, index) => (
        <DirectionsRenderer
          key={route.summary}
          directions={directions}
          routeIndex={index}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
