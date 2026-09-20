import React, {
  use,
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { AxiosError } from "axios";
import { SignInArgs, SignUpArgs } from "../types/api";
import { UserWithoutPassword } from "../models/user";
import { UsersApiFunctions } from "../api";

type DataResponse = {
  status: number;
  statusText: string;
  success: boolean;
  message: string;
};

type UserDataResponse = DataResponse & {
  sessionId?: string;
  user?: UserWithoutPassword;
};

const AuthContext = createContext<
  | {
      user?: UserWithoutPassword;
      signIn: (args: SignInArgs) => Promise<UserDataResponse>;
      signUp: (args: SignUpArgs) => Promise<DataResponse>;
      signOut: () => Promise<DataResponse>;
      sessionId?: string;
      isLoading: boolean;
    }
  | undefined
>(undefined);

// Use this hook to access the user info.
export const useSession = () => {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
};

type SesssionProviderProps = {
  usersApi: UsersApiFunctions;
  children: ReactNode;
};
export const SessionProvider = (props: SesssionProviderProps) => {
  const { usersApi, children } = props;
  const [user, setUser] = useState<UserWithoutPassword | undefined>();
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await usersApi.getProfile();
      const { success, message, user, sessionId } = data;

      if (success && user) {
        setUser(user);
        setSessionId(sessionId!);
      } else {
        console.error("Get session failed:", message);
      }
    } catch (error) {
      console.error("Get session error:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const signIn = async (args: SignInArgs): Promise<UserDataResponse> => {
    setIsLoading(true);
    try {
      const { data, status, statusText } = await usersApi.signIn(args);
      const { success, message, sessionId, user } = data;

      if (success) {
        setSessionId(sessionId!);
        setUser(user!);
        console.log(message);
      } else {
        console.error("Sign in failed:", message);
      }
      setIsLoading(false);
      return { status, statusText, success, message, sessionId, user };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Sign in error:", axiosError);
      const { message, status, cause } = axiosError;
      setIsLoading(false);
      return {
        success: false,
        message,
        status: status ?? 0,
        statusText: cause?.message ?? "",
      };
    }
  };

  const signUp = async (args: SignUpArgs): Promise<DataResponse> => {
    setIsLoading(true);
    try {
      const { data, status, statusText } = await usersApi.signUp(args);
      const { success, message } = data;

      if (success) {
        console.log(message);
      } else {
        console.error("Sign up failed:", message);
      }
      setIsLoading(false);
      return { status, statusText, success, message };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Sign up error:", error);
      const { message, status, cause } = axiosError;
      setIsLoading(false);
      return {
        success: false,
        message,
        status: status ?? 0,
        statusText: cause?.message ?? "",
      };
    }
  };

  const signOut = async (): Promise<DataResponse> => {
    setIsLoading(true);
    try {
      const { data, status, statusText } = await usersApi.signOut();
      const { success, message } = data;

      if (success) {
        setUser(undefined);
        setSessionId("");
        console.log(message);
      } else {
        console.error("Sign out failed:", message);
      }
      setIsLoading(false);
      return { status, statusText, success, message };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Sign out error:", error);
      const { message, status, cause } = axiosError;
      setIsLoading(false);
      return {
        success: false,
        message,
        status: status ?? 0,
        statusText: cause?.message ?? "",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
