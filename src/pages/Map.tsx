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
import {
  Box,
  Card,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import TripTabs from "@components/TripTabs";

const Map = () => {
  const { tripId = "" } = useParams();
  const { colorMode } = useColorMode();
  const [isLandscape] = useMediaQuery(["(orientation: landscape)"]);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >();
  const [isDirectionsRendered, setIsDirectionsRendered] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [tab, setTab] = useState("details");

  const { trip, isLoading } = useTrip(tripId);
  const { name, waypoints = [] } = trip || {};
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
    console.log("Map unmounted");
    setMap(null);
  };

  const directionsServiceCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (isDirectionsRendered) {
      return;
    } else if (
      status === google.maps.DirectionsStatus.OK &&
      !isDirectionsRendered
    ) {
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
    <Box
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      paddingTop={5}
      display="flex"
    >
      {isInfoVisible &&
        (isLandscape ? (
          <Card.Root variant="subtle" size="lg" width={500}>
            <Card.Header as={HStack} justifyContent="space-between">
              <Card.Title>{name}</Card.Title>
              <CloseButton
                color="white"
                onClick={() => setIsInfoVisible(false)}
              />
            </Card.Header>
            <Card.Body>
              <TripTabs trip={trip!} tab={tab} setTab={setTab} />
            </Card.Body>
          </Card.Root>
        ) : (
          <Drawer.Root
            open={isInfoVisible}
            onOpenChange={(e) => setIsInfoVisible(e.open)}
            placement="start"
            size="sm"
          >
            <Drawer.Backdrop />
            <Drawer.Trigger />
            <Drawer.Positioner padding={5}>
              <Drawer.Content
                bgColor={{ _light: "orange/60", _dark: "gray.950/60" }}
                backdropFilter="blur(5px)"
                borderRadius={5}
              >
                <Drawer.Header>
                  <Drawer.Title>{name}</Drawer.Title>
                  <Drawer.CloseTrigger />
                </Drawer.Header>
                <Drawer.Body>
                  <TripTabs trip={trip!} tab={tab} setTab={setTab} />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        ))}
      <GoogleMap
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={{
          width: "100%",
          height: "calc(100vh - 120px)",
          borderRadius: "10px",
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
    </Box>
  );
};

export default Map;
