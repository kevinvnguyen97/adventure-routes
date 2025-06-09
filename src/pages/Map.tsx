import { useTrip } from "@hooks/trip";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
// import { useState } from "react";
import { useParams } from "react-router-dom";

const Map = () => {
  const { tripId = "" } = useParams();

  //   const [map, setMap] = useState<google.maps.Map | null>(null);

  const { trip, isLoading } = useTrip(tripId);

  const onMapLoad = (map: google.maps.Map) => {
    console.log("Map loaded:", map);
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    // setMap(map);
  };
  const onMapUnmount = () => {
    console.log("Map unmounted");
    // setMap(null);
  };

  const directionsServiceCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK") {
      console.log("Directions response:", response);
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
    >
      <DirectionsService
        options={{
          origin: trip?.waypoints[0] || "",
          destination: trip?.waypoints[trip?.waypoints.length - 1] || "",
          travelMode: google.maps.TravelMode.DRIVING,
        }}
        callback={directionsServiceCallback}
      />
      <DirectionsRenderer />
    </GoogleMap>
  );
};

export default Map;
