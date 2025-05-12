import React, { useState, CSSProperties } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE: CSSProperties = {
  width: "100%",
  height: "calc(100vh - 84px)",
};

export const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <GoogleMap mapContainerStyle={MAP_CONTAINER_STYLE} onLoad={onLoad} />;
};
