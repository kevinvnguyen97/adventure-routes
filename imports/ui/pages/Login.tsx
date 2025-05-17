import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.document.title = "Login";
  }, []);

  const navigate = useNavigate();
  const { setSnackbar } = useAlertSnackbar();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      padding={2}
    >
      <Typography fontSize={60}>
        <LocationOnIcon fontSize="inherit" /> Adventure Routes
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        width={400}
        display="flex"
        flexDirection="column"
      >
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
          label="Username or Email"
          type="text"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          required
        />
        <Button sx={{ alignSelf: "center" }} type="submit" variant="contained">
          Login
        </Button>
      </Box>
      <Button variant="text" onClick={() => navigate("/register")}>
        New account? Register here
      </Button>
    </Box>
  );
};
