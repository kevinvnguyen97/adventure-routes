export type GoogleRoute = {
  legs: GoogleLeg[];
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: {
    encodedPolyline: string;
  };
  description: string;
  warnings: string[];
  viewport: {
    low: LatLng;
    high: LatLng;
  };
  travelAdvisory: {};
  localizedValues: {
    distance: {
      text: string;
    };
    duration: {
      text: string;
    };
    staticDuration: {
      text: string;
    };
  };
  routelabels: string[];
  polylineDetails: {};
};

export type GoogleStep = {
  distanceMeters: number;
  staticDuration: string;
  polyline: {
    encodedPolyline: string;
  };
  startLocation: {
    latLng: LatLng;
  };
  endLocation: {
    latLng: LatLng;
  };
  navigationInstruction: {
    maneuver: string;
    instructions: string;
  };
  localizedValues: {
    distance: {
      text: string;
    };
    staticDuration: {
      text: string;
    };
  };
  travelMode: TravelMode;
};

export type GoogleLeg = {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: {
    encodedPolyline: string;
  };
  startLocation: {
    latLng: LatLng;
  };
  endLocation: {
    latLng: LatLng;
  };
  steps: GoogleStep[];
  localizedValues: {
    distance: {
      text: string;
    };
    duration: {
      text: string;
    };
    staticDuration: {
      text: string;
    };
  };
};

export type GoogleGeocoderStatus = {
  geocoderStatus: {};
  type: string[];
  placeId: string;
};

export type GoogleGeocodingResults = {
  origin: GoogleGeocoderStatus;
  destination: GoogleGeocoderStatus;
  intermediates: GoogleGeocoderStatus[];
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type TravelMode =
  | "BICYCLING"
  | "DRIVING"
  | "TRANSIT"
  | "TWO_WHEELER"
  | "WALKING";

export type ComputeRoutesArgs = {
  waypoints: string[];
  travelMode?: TravelMode;
};

export type ComputeRoutesResponse = {
  response?: GoogleComputeRoutesResponse;
  success: boolean;
  message: string;
};
export type GoogleComputeRoutesResponse = {
  routes?: GoogleRoute[];
  geocodingResults?: GoogleGeocodingResults;
  error?: {
    code: number;
    message: string;
    status: string;
  };
};
