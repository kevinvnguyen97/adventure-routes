import { Box } from "@chakra-ui/react";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";

import NavigationBar from "@components/NavigationBar";
import { Toaster } from "@components/ui/toaster";
import SignIn from "@pages/SignIn";
import Dashboard from "@pages/Dashboard";
import SignUp from "@pages/SignUp";
import Map from "@pages/Map";
import { useAuth } from "@utils/auth";
import Settings from "@pages/Settings";
import Loading from "@components/Loading";

const ProtectedRoute = () => {
  const { user, isUserDataLoading } = useAuth();

  if (!user && !isUserDataLoading) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

const NonProtectedRoute = () => {
  const { user, isUserDataLoading } = useAuth();

  if (!!user && !isUserDataLoading) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Box
      width="100%"
      data-state="open"
      _open={{ animation: "fade-in 1s ease-out" }}
      colorPalette={{ _light: "orange" }}
    >
      <NavigationBar />
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="map/:tripId" element={<Map />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route element={<NonProtectedRoute />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="loading-test" element={<Loading />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
};

export default App;
