import { useContext, createContext } from "react";

type AuthTokenValues = {
  token: string;
  updateToken: (token: string) => void;
};
export const AuthContext = createContext<AuthTokenValues>({
  token: "",
  updateToken: () => {},
});
export const useAuth = () => {
  return useContext(AuthContext);
};
