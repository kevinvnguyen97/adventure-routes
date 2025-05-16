import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.document.title = "Login";
  }, []);

  const navigate = useNavigate();
  const { setSnackbar } = useAlertSnackbar();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setSnackbar({
        isOpen: true,
        severity: "error",
        message: "Please enter both username and password",
      });
      return;
    }

    Meteor.loginWithPassword({ username }, password, (error) => {
      if (error) {
        console.error("Login failed", error);
        setSnackbar({
          isOpen: true,
          severity: "error",
          message: error.message || "Login failed",
        });
      } else {
        console.log("Login successful");
        const { username = "" } = Meteor.user() || {};
        setSnackbar({
          isOpen: true,
          severity: "success",
          message: "Login successful. Welcome back, " + username,
        });
      }
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography fontSize={60}>
        <LocationOnIcon fontSize="inherit" /> Adventure Routes
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        flexDirection="column"
        display="flex"
        width={400}
        justifyContent="center"
        gap={2}
      >
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
          label="Username or Email"
          type="text"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          label="Password"
          type="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
      <Button variant="text" onClick={() => navigate("/register")}>
        New account? Register here
      </Button>
    </Box>
  );
};
