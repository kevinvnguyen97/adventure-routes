import Trip from "@shared/models/trip";
import { UserWithoutPassword } from "../models/user";

export type ServerResponse = {
  success: boolean;
  message: string;
};

export interface SignInResponse extends ServerResponse {
  sessionId?: string;
}

export interface GetProfileResponse extends ServerResponse {
  user?: UserWithoutPassword;
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
