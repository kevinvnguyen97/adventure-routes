import { useColorMode } from "@components/ui/color-mode";
import { useTrip } from "@hooks/trip";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { LuInfo } from "react-icons/lu";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton } from "@chakra-ui/react";
import Loading from "@components/Loading";
import { RouteColors } from "@constants/google";
import TripDetails from "@components/TripDetails";

const Map = () => {
  const { tripId = "" } = useParams();
  const { colorMode } = useColorMode();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  console.log("Map:", map);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >();
  const [isTripRendered, setIsTripRendered] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

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
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  };
  const onMapUnmount = () => {
    setMap(null);
  };

  const directionsServiceCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (directions) {
      return;
    } else if (status === google.maps.DirectionsStatus.OK && !directions) {
      console.log("Directions response:", response);
      setDirections(response as google.maps.DirectionsResult | undefined);
    } else {
      console.error("Error fetching directions:", status);
    }
  };

  const onDirectionsRendererOnload = () => {
    setIsTripRendered(true);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      paddingTop={5}
      display="flex"
      gap={5}
    >
      <TripDetails
        trip={trip!}
        isInfoVisible={isInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
      />
      <GoogleMap
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={{
          width: "100%",
          height: "calc(100vh - 120px)",
          borderRadius: "0.375rem",
        }}
        options={{
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          fullscreenControl: false,
          colorScheme:
            colorMode === "dark"
              ? google.maps.ColorScheme.DARK
              : google.maps.ColorScheme.LIGHT,
        }}
      >
        <IconButton
          onClick={() => setIsInfoVisible(!isInfoVisible)}
          left={2}
          top={2}
          bgColor={{ _light: "white", _dark: "#444444" }}
          color={{ _light: "black", _dark: "white" }}
        >
          <LuInfo />
        </IconButton>
        {!isTripRendered && <Loading />}
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
            onLoad={onDirectionsRendererOnload}
            options={{
              polylineOptions: {
                strokeColor: RouteColors[index],
                strokeWeight: 5,
                strokeOpacity: 0.6,
                geodesic: true,
              },
            }}
          />
        ))}
      </GoogleMap>
    </Box>
  );
};

export default Map;
