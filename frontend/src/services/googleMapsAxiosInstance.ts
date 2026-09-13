import axios from "axios";

type ComputeRoutesResponse = {
  routes?: google.maps.routes.Route[];
  fallbackInfo?: google.maps.routes.FallbackInfo;
  geocodingResults?: google.maps.routes.GeocodingResults;
};

const googleApiInstance = axios.create({
  baseURL: "https://routes.googleapis.com",
  timeout: 10000,
  headers: {
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  },
});

export const googleApi = {
  computeRoutes: (args: {
    waypoints: string[];
    travelMode: google.maps.TravelMode;
  }) => {
    const { waypoints } = args;
    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(1, -1);
    const formattedArgs = {
      origin: { address: origin },
      destination: { address: destination },
      intermediates: intermediateWaypoints.map((waypoint) => {
        return { address: waypoint };
      }),
    };

    return googleApiInstance.post<ComputeRoutesResponse>(
      "/directions/v2:computeRoutes",
      formattedArgs,
      { headers: { "X-Goog-FieldMask": "*" } },
    );
  },
};
