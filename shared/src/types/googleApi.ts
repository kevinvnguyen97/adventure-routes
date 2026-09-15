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
    low: {
      latitude: number;
      longitude: number;
    };
    high: {
      latitude: number;
      longitude: number;
    };
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
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  endLocation: {
    latLng: {
      latitude: number;
      longitude: number;
    };
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
  travelMode: string;
};

export type GoogleLeg = {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: {
    encodedPolyline: string;
  };
  startLocation: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  endLocation: {
    latLng: {
      latitude: number;
      longitude: number;
    };
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

export type ComputeRoutesResponse = {
  routes?: GoogleRoute[];
  geocodingResults?: GoogleGeocodingResults;
  error?: {
    code: number;
    message: string;
    status: string;
  };
};
