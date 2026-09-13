import { googleApi } from "@services/googleMapsAxiosInstance";
import { useMap, Polyline, Marker } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import { RouteColors } from "@constants/google";

type CustomRouteViewPort = {
  high: { latitude: number; longitude: number };
  low: { latitude: number; longitude: number };
};

type TripRouteRendererProps = {
  waypoints: string[];
};
const TripRouteRenderer = (props: TripRouteRendererProps) => {
  const { waypoints } = props;

  const [routes, setRoutes] = useState<google.maps.routes.Route[]>([]);
  const [markerCoordinates, setMarkerCoordinates] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const map = useMap();

  const getRoutes = useCallback(async () => {
    const { data } = await googleApi.computeRoutes({
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const { routes = [] } = data;
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
          // @ts-expect-error: Type not yet updated for new Routes API
          const { latLng: startLatLng } = startLocation;
          const { latitude: startLat, longitude: startLng } = startLatLng;

          // @ts-expect-error: Type not yet updated for new Routes API
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
            position={markerCoordinate}
            label={String.fromCharCode(i + 65)}
          />
        );
      })}
      {routes.map((route, i) => (
        <Polyline
          key={i}
          // @ts-expect-error types not yet updated for new Routes api
          encodedPath={route.polyline.encodedPolyline}
          strokeColor={RouteColors[i]}
          strokeWeight={6}
        />
      ))}
    </>
  );
};

export default TripRouteRenderer;
