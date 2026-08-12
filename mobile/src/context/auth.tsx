import { use, createContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
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
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
        },
        signOut: () => {},
        session: "",
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
