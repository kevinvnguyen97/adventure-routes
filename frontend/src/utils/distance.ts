export const getTotalDistance = (legs: google.maps.DirectionsLeg[]) => {
  return (
    legs
      .map(({ distance }) => distance?.value ?? 0)
      .reduce(
        (accumulatedDistance, legDistance) => accumulatedDistance + legDistance
      ) ?? 0
  );
};

export const formatMetricDistance = (meters: number) => {
  if (meters < 1000) {
    return `${meters} m`;
  }
  const kilometers = meters / 1000;
  if (kilometers < 100) {
    return `${kilometers.toFixed(1)} km`;
  } else {
    return `${Math.round(kilometers).toLocaleString("en-US")} km`;
  }
};

export const formatImperialDistance = (meters: number) => {
  const feet = meters * 3.280839895;
  if (feet < 528) {
    return `${feet} ft`;
  }

  const miles = feet / 5280;
  if (miles < 100) {
    return `${miles.toFixed(1)} mi`;
  } else {
    return `${Math.round(miles).toLocaleString("en-US")} mi`;
  }
};
