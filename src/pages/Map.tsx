import { useColorMode } from "@components/ui/color-mode";
import { useTrip } from "@hooks/trip";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { LuInfo } from "react-icons/lu";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton } from "@chakra-ui/react";
import Loading from "@components/Loading";
import { RouteColors } from "@constants/google";
import TripDetails from "@components/TripDetails";
import { toaster } from "@utils/toaster";

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
  const [areRouteAlternativesAllowed, setAreRouteAlternativesAllowed] =
    useState(true);

  const { trip, isLoading } = useTrip(tripId);
  const { name = "", waypoints = [] } = trip || {};
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
    }
    switch (status) {
      // Directions successfully fetched
      case google.maps.DirectionsStatus.OK:
        setDirections(response as google.maps.DirectionsResult);
        toaster.create({
          title: "Success",
          description: `Routes found successfully for trip "${name}"`,
          type: "success",
          closable: true,
        });
        break;
      case google.maps.DirectionsStatus.INVALID_REQUEST:
        toaster.create({
          title: "Invalid Request",
          description: "Route cannot be rendered",
          type: "error",
          closable: true,
        });
        break;
      // At least one waypoint cannot be found
      case google.maps.DirectionsStatus.NOT_FOUND:
        toaster.create({
          title: "Not Found",
          description: "At least one waypoint is not found",
          type: "error",
          closable: true,
        });
        break;
      // No routes can be found between origin and destination
      case google.maps.DirectionsStatus.ZERO_RESULTS:
        toaster.create({
          title: "Zero Results",
          description: "No routes found between origin and destination",
          type: "error",
          closable: true,
        });
        break;
      // Too many waypoints
      case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED:
        toaster.create({
          title: "Too Many Waypoints",
          description: "Too many waypoints added to trip",
          type: "error",
          closable: true,
        });
        break;
      // Query limit reached
      case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
        toaster.create({
          title: "Too Many Requests",
          description: "Please wait a few minutes to reset query limit",
          type: "error",
          closable: true,
        });
        break;
      // Webpage denied to use directions service
      case google.maps.DirectionsStatus.REQUEST_DENIED:
        toaster.create({
          title: "Request Denied",
          description: "Directions service is not allowed",
          type: "error",
          closable: true,
        });
        break;
      // @ts-expect-error This error exists but
      // is not part of google.maps.DirectionsStatus enum
      case "MAX_ROUTE_LENGTH_EXCEEDED": {
        const numOfRoutes = response?.routes?.length ?? 0;
        if (numOfRoutes <= 1) {
          toaster.create({
            title: "Zero Results",
            description: "No routes found between origin and destination",
            type: "error",
            closable: true,
          });
          break;
        }
        setAreRouteAlternativesAllowed(false);
        setDirections(undefined);
        break;
      }
      // Catch other errors
      default:
        console.error("Error fetching directions:", status);
        toaster.create({
          title: "Unknown Error",
          description: "Server error occured",
          type: "error",
          closable: true,
        });
        break;
    }
  };

  const onDirectionsRendererOnload = () => {
    setIsTripRendered(true);
  };

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
            provideRouteAlternatives: areRouteAlternativesAllowed,
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
