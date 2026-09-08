import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@utils/auth";
import type { UserWithoutPassword } from "@shared/models/user";
import { toaster } from "@utils/toaster";
import { useNavigate } from "react-router-dom";

import type { SignInArgs, SignUpArgs } from "@shared/types/api";
import { usersApi } from "@services/axiosInstance";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | undefined>(undefined);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setIsUserDataLoading(true);

    try {
      const { data } = await usersApi.getProfile();
      const { success, user: responseUser } = data;

      if (success && responseUser) {
        setUser(responseUser);
      }
      setIsUserDataLoading(false);
    } catch (error) {
      console.error("Cannot get profile:", error);
    }
  }, [setUser, setIsUserDataLoading]);

  const signInUser = async (args: SignInArgs) => {
    const { usernameOrEmail, password } = args;
    try {
      const { data, status, statusText } = await usersApi.signIn({
        usernameOrEmail,
        password,
      });

      const { success, message } = data;

      toaster.create({
        title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
        description: message,
        type: success ? "success" : "error",
        closable: true,
      });

      if (success) {
        await fetchUser();
      } else {
        console.error("Sign up does not work");
      }
    } catch (error) {
      const signInError = error as Error;
      console.error("Sign in failed:", signInError);
    }
  };

  const signUpUser = async (args: SignUpArgs) => {
    try {
      const { data, status, statusText } = await usersApi.signUp(args);

      const { success, message } = data;

      toaster.create({
        title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
        description: message,
        type: success ? "success" : "error",
        closable: true,
      });

      if (success) {
        navigate("/");
      } else {
        console.error("Sign up does not work");
      }
    } catch (error) {
      const signUpError = error as Error;
      console.error("Sign up failed:", signUpError.message);
    }
  };

  const signOutUser = async () => {
    try {
      const { data, status, statusText } = await usersApi.signOut();
      const { success, message } = data;

      toaster.create({
        title: `${success ? "Code" : "Error"} ${status} ${statusText}`,
        description: message,
        type: success ? "success" : "error",
        closable: true,
      });
    } catch (error) {
      const signOutError = error as Error;
      console.error("Sign out failed:", signOutError.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValue = {
    user,
    isUserDataLoading,
    signInUser,
    signOutUser,
    signUpUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
