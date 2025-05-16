import React, { useState, CSSProperties } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { SECRETS } from "/imports/constants";

const MAP_CONTAINER_STYLE: CSSProperties = {
  width: "100%",
  height: "calc(100vh - 84px)",
};

export const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  };

  return <GoogleMap mapContainerStyle={MAP_CONTAINER_STYLE} onLoad={onLoad} />;
};
