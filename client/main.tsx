import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { BrowserRouter } from "react-router-dom";

import { App } from "/imports/ui/App";
import { AuthProvider } from "/imports/providers/Auth";
import { AlertSnackbarProvider } from "/imports/providers/AlertSnackbarProvider";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);

  const theme = createTheme({
    palette: { mode: "dark" },
  });

  root.render(
    <BrowserRouter>
      <AuthProvider>
        <AlertSnackbarProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AlertSnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});
