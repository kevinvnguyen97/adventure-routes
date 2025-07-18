import type { UserWithoutPassword } from "@models/user";
import { useContext, createContext } from "react";

type AuthTokenValues = {
  user?: UserWithoutPassword;
  isUserDataLoading: boolean;
  loginUser: (args: { usernameOrEmail: string; password: string }) => void;
  registerUser: (args: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
  }) => void;
  logoutUser: () => void;
};
export const AuthContext = createContext<AuthTokenValues>({
  user: undefined,
  isUserDataLoading: true,
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
