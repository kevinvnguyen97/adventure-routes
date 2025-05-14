import React from "react";
import { Alert, Fade, Snackbar } from "@mui/material";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";

export const AlertSnackbar = () => {
  const { isOpen, severity, message, handleSnackbarClose } = useAlertSnackbar();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleSnackbarClose}
      slots={{ transition: Fade }}
    >
      <Alert variant="filled" severity={severity} onClose={handleSnackbarClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
