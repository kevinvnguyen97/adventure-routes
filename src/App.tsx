import { Box } from "@chakra-ui/react";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";

import NavigationBar from "@components/NavigationBar";
import { Toaster } from "@components/ui/toaster";
import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";
import Register from "@pages/Register";
import Map from "@pages/Map";
import { useAuth } from "@utils/auth";
import Settings from "@pages/Settings";

const ProtectedRoute = () => {
  const { user, isUserDataLoading } = useAuth();

  if (!user && !isUserDataLoading) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const NonProtectedRoute = () => {
  const { user, isUserDataLoading } = useAuth();

  if (user && !isUserDataLoading) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Box width="100%" colorPalette="orange">
      <NavigationBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="map/:tripId" element={<Map />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<NonProtectedRoute />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
};

export default App;
