import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@utils/auth";
import type { UserWithoutPassword } from "@models/user";
import { toaster } from "@utils/toaster";
import { useNavigate } from "react-router-dom";

type AuthResponse = {
  success: boolean;
  sessionId?: string;
  message: string;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | undefined>(undefined);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setIsUserDataLoading(true);
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    switch (response.status) {
      case 200: {
        const user = (await response.json()) as unknown as UserWithoutPassword;
        setUser(user);
        setIsUserDataLoading(false);
        break;
      }
      default:
        setIsUserDataLoading(false);
        break;
    }
  }, [setUser, setIsUserDataLoading]);

  const signInUser = async (args: {
    usernameOrEmail: string;
    password: string;
  }) => {
    const { usernameOrEmail, password } = args;
    try {
      const response = await fetch("/api/users/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      const responseJSON = (await response.json()) as AuthResponse;

      toaster.create({
        title: `${responseJSON.success ? "Code" : "Error"} ${response.status} ${response.statusText}`,
        description: responseJSON.message,
        type: responseJSON.success ? "success" : "error",
        closable: true,
      });

      if (responseJSON.success) {
        await fetchUser();
      } else {
        console.error("Sign up does not work");
      }
    } catch (error) {
      const signInError = error as Error;
      console.error("Sign in failed:", signInError);
    }
  };

  const signUpUser = async (args: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch("/api/users/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      const responseJSON = (await response.json()) as AuthResponse;

      toaster.create({
        title: `${responseJSON.success ? "Code" : "Error"} ${response.status} ${response.statusText}`,
        description: responseJSON.message,
        type: responseJSON.success ? "success" : "error",
        closable: true,
      });

      if (responseJSON.success) {
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
      const response = await fetch("/api/users/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      switch (response.status) {
        case 200:
          setUser(undefined);
          toaster.create({
            title: `Code ${response.status} (${response.statusText})`,
            description: await response.text(),
            type: "success",
            closable: true,
          });
          break;
        default:
          toaster.create({
            title: `Error ${response.status} (${response.statusText})`,
            description: await response.text(),
            type: "error",
            closable: true,
          });
          break;
      }
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
