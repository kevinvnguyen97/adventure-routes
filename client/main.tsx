import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { BrowserRouter } from "react-router-dom";

import { App } from "/imports/ui/App";
import { AuthProvider } from "/imports/providers/Auth";
import { AlertSnackbarProvider } from "/imports/providers/AlertSnackbarProvider";
import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_LIBRARIES, SECRETS } from "/imports/constants";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);

  const theme = createTheme({
    palette: { mode: "dark" },
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            textTransform: "none",
          },
          containedPrimary: {
            textTransform: "none",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  root.render(
    <BrowserRouter>
      <AuthProvider>
        <AlertSnackbarProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoadScript
              googleMapsApiKey={SECRETS.public.oauth.googleMapsApiKey}
              libraries={GOOGLE_MAPS_LIBRARIES}
            >
              <App />
            </LoadScript>
          </ThemeProvider>
        </AlertSnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});
