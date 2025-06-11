import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@utils/auth";
import type { UserWithoutPassword } from "@models/user";
import { toaster } from "@utils/toaster";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | undefined>(undefined);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setIsUserDataLoading(true);
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      const user = (await response.json()) as unknown as UserWithoutPassword;
      setUser(user);
      setIsUserDataLoading(false);
    } else {
      setIsUserDataLoading(false);
    }
  }, [setUser, setIsUserDataLoading]);

  const loginUser = async (args: {
    usernameOrEmail: string;
    password: string;
  }) => {
    const { usernameOrEmail, password } = args;
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      switch (response.status) {
        case 200:
          await fetchUser();
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
          console.error("Login does not work");
          break;
      }
    } catch (error) {
      const loginError = error as Error;
      console.error("Login failed:", loginError);
    }
  };

  const registerUser = async (args: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      switch (response.status) {
        case 200:
          await fetchUser();
          break;
        default:
          console.error("Register does not work");
          break;
      }
    } catch (error) {
      const registerError = error as Error;
      console.error("Register failed:", registerError.message);
    }
  };

  const logoutUser = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setUser(undefined);
    } catch (error) {
      const logoutError = error as Error;
      console.error("Logout failed:", logoutError.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValue = {
    user,
    isUserDataLoading,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
