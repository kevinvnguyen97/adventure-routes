import type { UserWithoutPassword } from "@shared/models/user";
import { useContext, createContext } from "react";
import type { SignInArgs, SignUpArgs } from "@shared/types/api";

type AuthTokenValues = {
  user?: UserWithoutPassword;
  isUserDataLoading: boolean;
  signInUser: (args: SignInArgs) => void;
  signUpUser: (args: SignUpArgs) => void;
  signOutUser: () => void;
};
export const AuthContext = createContext<AuthTokenValues>({
  user: undefined,
  isUserDataLoading: true,
  signInUser: () => {},
  signUpUser: () => {},
  signOutUser: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
