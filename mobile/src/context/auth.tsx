import usersApi from "@/services/usersApi";
import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";

type AuthResponse = {
  sessionId?: string;
  message: string;
  success: boolean;
};

type GetProfileResponse = {
  message: string;
  success: boolean;
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    profilePictureUrl?: string;
  };
  sessionId?: string;
};

const AuthContext = createContext<{
  signIn: (args: { usernameOrEmail: string; password: string }) => void;
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

  const getProfile = async () => {
    try {
      const { data } = await usersApi.getProfile();

      const { success, user, sessionId } = data as GetProfileResponse;

      if (success) {
        setSessionId(sessionId!);
      }
    } catch (error) {
      console.error("Get profile error:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const signIn = async (args: {
    usernameOrEmail: string;
    password: string;
  }) => {
    try {
      const { data } = await usersApi.signIn(args);
      const { success, sessionId } = data as AuthResponse;
      if (success) {
        setSessionId(sessionId!);
        console.log("Sign in successful");
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
