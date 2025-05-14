import React, { useContext, createContext, useState } from "react";

type AlertSnackbarState = {
  isOpen: boolean;
  severity: "success" | "error" | "info" | "warning";
  message: string;
};
type AlertSnackbarContext = {
  isOpen: boolean;
  severity: "success" | "error" | "info" | "warning";
  message: string;
  setSnackbar: (snackbar: AlertSnackbarState) => void;
  handleSnackbarClose: () => void;
};

export const AlertSnackbarContext = createContext<AlertSnackbarContext>({
  isOpen: false,
  severity: "info",
  message: "",
  setSnackbar: () => {},
  handleSnackbarClose: () => {},
});

export const useAlertSnackbar = () => {
  const context = useContext(AlertSnackbarContext);
  if (!context) {
    throw new Error(
      "useAlertSnackbar must be used within an AlertSnackbarProvider"
    );
  }
  return context;
};

export const AlertSnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<AlertSnackbarState>({
    isOpen: false,
    severity: "info",
    message: "",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ isOpen: false, severity: "info", message: "" });
  };

  return (
    <AlertSnackbarContext.Provider
      value={{ ...snackbar, setSnackbar, handleSnackbarClose }}
    >
      {children}
    </AlertSnackbarContext.Provider>
  );
};
