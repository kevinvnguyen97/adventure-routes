import "./App.css";
import type { ReactNode } from "react";

import { Box } from "@chakra-ui/react";
import { Navigate, Routes, Route } from "react-router-dom";
import NavigationBar from "@components/NavigationBar";
import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";
import Register from "@pages/Register";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Box width="100%" colorPalette="orange">
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
