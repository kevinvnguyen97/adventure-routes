export const getTotalDuration = (
  legs: google.maps.DirectionsLeg[],
  inTraffic?: boolean
) => {
  return (
    legs
      .map(
        ({ duration, duration_in_traffic }) =>
          (inTraffic && !!duration_in_traffic ? duration_in_traffic : duration)
            ?.value ?? 0
      )
      .reduce(
        (accumulatedDuration, legDuration) => accumulatedDuration + legDuration
      ) ?? 0
  );
};

export const formatDuration = (numberOfSeconds: number) => {
  const numberOfDays = numberOfSeconds / 60 / 60 / 24;
  const numberOfHours = (numberOfDays % 1) * 24;
  const numberOfMinutes = Math.round((numberOfHours % 1) * 60);

  const formattedDays =
    Math.trunc(numberOfDays) > 0 ? `${Math.trunc(numberOfDays)} d` : "";
  const formattedHours =
    Math.trunc(numberOfHours) > 0
      ? `${
          Math.trunc(numberOfDays) < 1
            ? Math.trunc(numberOfHours)
            : Math.round(numberOfHours)
        } ${Math.trunc(numberOfHours) === 1 ? "hour" : "hours"}`
      : "";
  const formattedMinutes =
    numberOfMinutes > 0 && numberOfDays < 1
      ? `${numberOfMinutes} ${numberOfMinutes === 1 ? "min" : "mins"}`
      : "";
  const formattedDuration = [formattedDays, formattedHours, formattedMinutes]
    .filter(Boolean)
    .join(" ");

  return formattedDuration;
};
