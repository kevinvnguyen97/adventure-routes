import { Meteor } from "meteor/meteor";
import { AdventureRoute } from "/imports/api/adventureRoutes";

export async function meteorMethodPromise(
  name: "deleteAdventureRoute",
  adventureRouteId: string
): Promise<void>;
export async function meteorMethodPromise(
  name: "upsertAdventureRoute",
  adventureRoute: AdventureRoute
): Promise<void>;
export async function meteorMethodPromise(
  name: "changeProfilePicture",
  newProfilePictureUrl: string
): Promise<void>;
export async function meteorMethodPromise<TReturn, TArgs extends any[]>(
  name: string,
  ...args: TArgs
): Promise<TReturn> {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Meteor.callAsync(name, ...args);
      resolve(result);
    } catch (error) {
      if (error) {
        reject(error);
      }
    }
  });
}

export const getTotalDistance = (legs: google.maps.DirectionsLeg[]) => {
  return (
    legs
      ?.map(({ distance }) => distance?.value ?? 0)
      .reduce(
        (accumulatedDistance, legDistance) => accumulatedDistance + legDistance
      ) ?? 0
  );
};

export const getTotalDuration = (
  legs: google.maps.DirectionsLeg[],
  inTraffic?: boolean
) => {
  return (
    legs
      ?.map(
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
    Math.trunc(numberOfDays) > 0
      ? `${Math.trunc(numberOfDays)} ${
          Math.trunc(numberOfDays) === 1 ? "day" : "days"
        }`
      : "";
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

export const formatImperialDistance = (numberOfMeters: number) => {
  const numberOfFeet = numberOfMeters * 3.280839895;
  if (numberOfFeet < 528) {
    return `${numberOfFeet} ft`;
  }

  const numberOfMiles = numberOfFeet / 5280;
  if (numberOfMiles < 100) {
    return `${numberOfMiles.toFixed(1)} mi`;
  } else {
    return `${Math.round(numberOfMiles).toLocaleString("en-US")} mi`;
  }
};
