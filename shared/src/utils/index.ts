import { GoogleRoute, LatLng } from "../types/google";

export const getWaypointCoordinates = (route: GoogleRoute): LatLng[] => {
  const markerCoordinatesBetweenLegs: LatLng[] = route.legs.flatMap(
    ({ startLocation, endLocation }) => {
      const { latLng: startLatLng } = startLocation;
      const { latitude: startLat, longitude: startLng } = startLatLng;

      const { latLng: endLatLng } = endLocation;
      const { latitude: endLat, longitude: endLng } = endLatLng;

      return [
        { latitude: startLat, longitude: startLng },
        { latitude: endLat, longitude: endLng },
      ];
    },
  );

  const uniqueMarkerCoordinates: LatLng[] = Array.from(
    new Set(
      markerCoordinatesBetweenLegs.map((markerCoordinate) =>
        JSON.stringify(markerCoordinate),
      ),
    ),
  ).map((string) => JSON.parse(string));

  return uniqueMarkerCoordinates;
};
