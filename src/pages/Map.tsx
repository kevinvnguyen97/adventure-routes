import { useColorMode } from "@components/ui";
import { useTrip } from "@hooks/trip";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { renderToString } from "react-dom/server";

const MapOptionsButton = () => {
  return (
    <button
      style={{
        padding: "11px 23px",
        fontSize: "18px",
        cursor: "pointer",
        fontWeight: "500",
        borderRadius: "2px",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
      }}
    >
      Info
    </button>
  );
};

const Map = () => {
  const { tripId = "" } = useParams();
  const { colorMode } = useColorMode();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >();
  const [isDirectionsRendered, setIsDirectionsRendered] = useState(false);

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

  const createContainer = () => {
    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("id", "map-options-button-container");
    const button = renderToString(<MapOptionsButton />);
    buttonContainer.onclick = () => console.log("Hello");
    buttonContainer.innerHTML = button;
    buttonContainer.style.backgroundColor =
      colorMode === "light" ? "white" : "#444444";
    buttonContainer.style.color = colorMode === "light" ? "black" : "white";
    buttonContainer.style.marginTop = "10px";
    buttonContainer.style.borderRadius = "2px";

    return buttonContainer;
  };

  const onMapLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);

    const infoButton = createContainer();

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoButton);
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
    <GoogleMap
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
      mapContainerStyle={{
        width: "100%",
        height: "calc(100vh - 100px)",
      }}
      options={{
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        colorScheme:
          colorMode === "dark"
            ? google.maps.ColorScheme.DARK
            : google.maps.ColorScheme.LIGHT,
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
