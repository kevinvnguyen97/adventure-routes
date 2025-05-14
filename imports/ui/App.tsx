import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { NavigationBar } from "/imports/ui/components/NavigationBar";
import { AlertSnackbar } from "/imports/ui/components/AlertSnackbar";
import { Dashboard, Login, Register, Map } from "/imports/ui/pages";
import { RequireAuth, RequireNotAuth } from "../providers/Auth";

export const App = () => {
  const location = useLocation();

  return (
    <Box>
      <NavigationBar />
      <AlertSnackbar />
      <Box paddingTop={2} paddingBottom={2} width="100%">
        <Routes location={location} key={location.pathname}>
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="map/:routeId"
              element={
                <RequireAuth>
                  <Map />
                </RequireAuth>
              }
            />
            <Route
              path="login"
              element={
                <RequireNotAuth>
                  <Login />
                </RequireNotAuth>
              }
            />
            <Route
              path="register"
              element={
                <RequireNotAuth>
                  <Register />
                </RequireNotAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
