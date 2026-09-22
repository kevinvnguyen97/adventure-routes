import { Polyline, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { GoogleRoute, LatLng } from "@shared/types/google";
import { Colors } from "@shared/constants/color";

type TripRouteRendererProps = {
  routes: GoogleRoute[];
  areRoutesSelected: boolean[];
  selectedRouteIndex: number;
  markerCoordinates: LatLng[];
};
const TripRouteRenderer = (props: TripRouteRendererProps) => {
  const { routes, selectedRouteIndex, markerCoordinates } = props;

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
      {routes.map((route, i) => (
        <Polyline
          key={i}
          encodedPath={route.polyline.encodedPolyline}
          strokeColor={Colors.BLUE}
          strokeWeight={6}
          strokeOpacity={selectedRouteIndex === i ? 1 : 0.3}
          zIndex={selectedRouteIndex === i ? 1 : 0}
        />
      ))}
    </>
  );
};

export default TripRouteRenderer;
