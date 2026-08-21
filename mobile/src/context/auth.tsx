import usersApi from "@/services/usersApi";
import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from "react";

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
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const getProfile = useCallback(async () => {
    setIsUserDataLoading(true);
    try {
      const { data } = await usersApi.getProfile();

      const { success, user, sessionId } = data as GetProfileResponse;

      if (success) {
        setSessionId(sessionId!);
      }
      setIsUserDataLoading(false);
    } catch (error) {
      console.error("Get profile error:", error);
    }
  }, [setSessionId, setIsUserDataLoading]);

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
      console.error("Sign in error:", error);
    }
  };

  const signOut = async () => {
    try {
      const { data } = await usersApi.signOut();
      const { success } = data as AuthResponse;
      if (success) {
        setSessionId("");
        console.log("Sign out successful");
      }
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        sessionId,
        isLoading: isUserDataLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
