import { use, createContext, type PropsWithChildren, useState } from "react";

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
  const signIn = async (args: {
    usernameOrEmail: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(args),
        },
      );
      switch (response.status) {
        case 200:
          console.log("Signed in successfully");
          break;
        default:
          console.error("Sign in error");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {},
        sessionId: "",
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
