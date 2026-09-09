import { usersApi } from "@/services/axiosInstance";
import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { AxiosError } from "axios";
import { SignInArgs, SignUpArgs } from "@shared/types/api";

const AuthContext = createContext<{
  signIn: (args: SignInArgs) => void;
  signUp: (args: SignUpArgs) => void;
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
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    try {
      const { data } = await usersApi.getProfile();
      const { success, message, user, sessionId } = data;

      if (success && user) {
        setSessionId(sessionId!);
      } else {
        console.error("Get session failed:", message);
      }
    } catch (error) {
      console.error("Get session error:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const signIn = async (args: SignInArgs) => {
    setIsLoading(true);
    try {
      const { data } = await usersApi.signIn(args);
      const { success, message, sessionId } = data;

      if (success) {
        setSessionId(sessionId!);
        console.log(message);
      } else {
        console.error("Sign in failed:", message);
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
    setIsLoading(false);
  };

  const signUp = async (args: SignUpArgs) => {
    setIsLoading(true);
    try {
      const { data } = await usersApi.signUp(args);
      const { success, message } = data;

      if (success) {
        console.log(message);
      } else {
        console.error("Sign up failed:", message);
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { data } = await usersApi.signOut();
      const { success, message } = data;

      if (success) {
        setSessionId("");
        console.log(message);
      } else {
        console.error("Sign out failed:", message);
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        sessionId,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
