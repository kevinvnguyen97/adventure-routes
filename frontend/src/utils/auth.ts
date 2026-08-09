import type { UserWithoutPassword } from "@models/user";
import { useContext, createContext } from "react";

type AuthTokenValues = {
  user?: UserWithoutPassword;
  isUserDataLoading: boolean;
  signInUser: (args: { usernameOrEmail: string; password: string }) => void;
  registerUser: (args: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
  }) => void;
  signOutUser: () => void;
};
export const AuthContext = createContext<AuthTokenValues>({
  user: undefined,
  isUserDataLoading: true,
  signInUser: () => {},
  registerUser: () => {},
  signOutUser: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
