import { Polyline, Marker } from "@vis.gl/react-google-maps";
import { RouteColors } from "@constants/google";
import type { GoogleRoute, LatLng } from "@shared/types/google";

type TripRouteRendererProps = {
  routes: GoogleRoute[];
  areRoutesSelected: boolean[];
  markerCoordinates: LatLng[];
};
const TripRouteRenderer = (props: TripRouteRendererProps) => {
  const { routes, areRoutesSelected, markerCoordinates } = props;

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
      {routes.map(
        (route, i) =>
          areRoutesSelected[i] && (
            <Polyline
              key={i}
              encodedPath={route.polyline.encodedPolyline}
              strokeColor={RouteColors[i]}
              strokeWeight={6}
            />
          ),
      )}
    </>
  );
};

export default TripRouteRenderer;
