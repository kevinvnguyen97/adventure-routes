import type Trip from "../models/trip";
import type { UserWithoutPassword } from "../models/user";

export type ServerResponse = {
  success: boolean;
  message: string;
};

export interface SignInResponse extends ServerResponse {
  sessionId?: string;
}

export interface GetProfileResponse extends SignInResponse {
  user?: UserWithoutPassword;
}

export interface GetAllUsersResponse extends ServerResponse {
  users?: UserWithoutPassword[];
}

export interface GetTripResponse extends ServerResponse {
  trip?: Trip;
}

export interface GetTripsResponse extends ServerResponse {
  trips?: Trip[];
}

export type SignInArgs = {
  usernameOrEmail: string;
  password: string;
};

export type SignUpArgs = {
  email: string;
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type TripFormArgs = {
  name: string;
  description?: string;
  priceCategory: number;
  activities: string[];
  waypoints: string[];
};

export interface UpsertTripArgs extends TripFormArgs {
  tripId?: string;
}
