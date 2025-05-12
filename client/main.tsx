import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { BrowserRouter } from "react-router-dom";

import { App } from "/imports/ui/App";
import { AuthProvider } from "/imports/ui/providers/Auth";
import { LoadScript } from "@react-google-maps/api";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);

  const DARK_THEME = createTheme({
    palette: { mode: "dark" },
  });

  root.render(
    <BrowserRouter>
      <AuthProvider>
        <LoadScript
          googleMapsApiKey="AIzaSyAEqs54WFsIR5lPPDK9rxccCY5DM3VQ-Gs"
          libraries={["maps"]}
        >
          <ThemeProvider theme={DARK_THEME}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </LoadScript>
      </AuthProvider>
    </BrowserRouter>
  );
});
