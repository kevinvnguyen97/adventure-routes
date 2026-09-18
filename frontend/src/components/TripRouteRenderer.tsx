import { Polyline, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { RouteColors } from "@constants/google";
import type { GoogleRoute, LatLng } from "@shared/types/google";

type TripRouteRendererProps = {
  routes: GoogleRoute[];
  areRoutesSelected: boolean[];
  markerCoordinates: LatLng[];
};
const TripRouteRenderer = (props: TripRouteRendererProps) => {
  const { routes, areRoutesSelected, markerCoordinates } = props;

  const formattedMarkerCoordinates: google.maps.LatLngLiteral[] =
    markerCoordinates.map(({ latitude, longitude }) => ({
      lat: latitude,
      lng: longitude,
    }));

  return (
    <>
      {formattedMarkerCoordinates.map((markerCoordinate, i) => {
        return (
          <AdvancedMarker key={i} position={markerCoordinate}>
            <Pin glyphText={String.fromCharCode(i + 65)} glyphColor="white" />
          </AdvancedMarker>
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
