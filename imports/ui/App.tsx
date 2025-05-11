import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Box } from "@mui/material";
import { NavigationBar } from "/imports/ui/components/NavigationBar";
import { Dashboard, Login, Register, Map } from "/imports/ui/pages";

export const App = () => {
  return (
    <Box>
      <NavigationBar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="map/:routeId" element={<Map />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
};
