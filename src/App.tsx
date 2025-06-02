import "./App.css";
import { Box } from "@chakra-ui/react";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";

import NavigationBar from "@components/NavigationBar";
import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";
import Register from "@pages/Register";
import { useAuth } from "@utils/auth";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const NonProtectedRoute = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Box width="100%" colorPalette="orange">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/" element={<NonProtectedRoute />}>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
