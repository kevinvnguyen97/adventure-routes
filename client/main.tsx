import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Meteor } from "meteor/meteor";

import { App } from "/imports/ui/App";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);

  const DARK_THEME = createTheme({
    palette: { mode: "dark" },
  });

  root.render(
    <ThemeProvider theme={DARK_THEME}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
});
