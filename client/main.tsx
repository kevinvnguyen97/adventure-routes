import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { BrowserRouter } from "react-router-dom";

import { App } from "/imports/ui/App";
import { AuthProvider } from "/imports/ui/providers/Auth";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);

  const DARK_THEME = createTheme({
    palette: { mode: "dark" },
  });

  root.render(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={DARK_THEME}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
});
