import { googleApi } from "@services/axiosInstance";
import { useMap, Polyline, Marker } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import { RouteColors } from "@constants/google";
import type { GoogleRoute, LatLng } from "@shared/types/google";

type CustomRouteViewPort = {
  high: { latitude: number; longitude: number };
  low: { latitude: number; longitude: number };
};

type TripRouteRendererProps = {
  waypoints: string[];
};
const TripRouteRenderer = (props: TripRouteRendererProps) => {
  const { waypoints } = props;

  const [routes, setRoutes] = useState<GoogleRoute[]>([]);
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng[]>([]);
  const map = useMap();

  const getRoutes = useCallback(async () => {
    const { data } = await googleApi.computeRoutes({
      waypoints,
      travelMode: "DRIVING",
    });

    const { response } = data;

    const { routes = [] } = response || {};
    setRoutes(routes);
    return routes;
  }, [waypoints]);

  useEffect(() => {
    if (!map) return;

    const fitRouteInMap = async () => {
      const routes = await getRoutes();

      const route = routes[0];

      if (route && route.viewport) {
        // Place all advanced markers
        const markerCoordinates = route.legs!.flatMap((leg) => {
          const { startLocation, endLocation } = leg;
          const { latLng: startLatLng } = startLocation;
          const { latitude: startLat, longitude: startLng } = startLatLng;

          const { latLng: endLatLng } = endLocation;
          const { latitude: endLat, longitude: endLng } = endLatLng;

          return [
            { lat: startLat, lng: startLng },
            { lat: endLat, lng: endLng },
          ];
        });

        const uniqueMarkerCoordinates = Array.from(
          new Set(
            markerCoordinates.map((markerCoordinate) =>
              JSON.stringify(markerCoordinate),
            ),
          ),
        ).map((string) => JSON.parse(string));

        setMarkerCoordinates(uniqueMarkerCoordinates);

        // Fit to map view
        const { high, low } = route.viewport as unknown as CustomRouteViewPort;
        const bounds: google.maps.LatLngBoundsLiteral = {
          north: high.latitude,
          south: low.latitude,
          east: high.longitude,
          west: low.longitude,
        };
        if (map) {
          map.fitBounds(bounds);
        }
      }
    };

    fitRouteInMap();
  }, [getRoutes, map]);

  return (
    <>
      {markerCoordinates.map((markerCoordinate, i) => {
        return (
          <Marker
            position={markerCoordinate as unknown as google.maps.LatLngLiteral}
            label={String.fromCharCode(i + 65)}
          />
        );
      })}
      {routes.map((route, i) => (
        <Polyline
          key={i}
          encodedPath={route.polyline.encodedPolyline}
          strokeColor={RouteColors[i]}
          strokeWeight={6}
        />
      ))}
    </>
  );
};

export default TripRouteRenderer;
