import { usersApi } from "@/services/axiosInstance";
import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { AxiosError } from "axios";
import { SignInArgs } from "@shared/types/api";

const AuthContext = createContext<{
  signIn: (args: SignInArgs) => void;
  signOut: () => void;
  sessionId: string;
  isLoading: boolean;
} | null>(null);

// Use this hook to access the user info.
export const useSession = () => {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [sessionId, setSessionId] = useState("");

  const signIn = async (args: SignInArgs) => {
    try {
      const { data } = await usersApi.signIn(args);
      if (data.success) {
        setSessionId(data.sessionId!);
        console.log("Sign in successful");
      } else {
        console.error("Sign in failed:", data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Sign in error:",
        axiosError.code,
        axiosError.cause,
        axiosError.message,
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {},
        sessionId,
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
