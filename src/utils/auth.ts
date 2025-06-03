import type { UserWithoutPassword } from "@models/user";
import { useContext, createContext } from "react";

type AuthTokenValues = {
  user?: UserWithoutPassword;
  loginUser: (args: { usernameOrEmail: string; password: string }) => void;
  registerUser: (args: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }) => void;
  logoutUser: () => void;
};
export const AuthContext = createContext<AuthTokenValues>({
  user: undefined,
  loginUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
