import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    window.document.title = "Register";
  }, []);

  const { setSnackbar } = useAlertSnackbar();
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password || !passwordConfirm) {
      setSnackbar({
        isOpen: true,
        severity: "error",
        message: "Please fill in all fields",
      });
      return;
    }
    if (password.length < 6) {
      setSnackbar({
        isOpen: true,
        severity: "error",
        message: "Password must be at least 6 characters long",
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbar({
        isOpen: true,
        severity: "error",
        message: "Please enter a valid email address",
      });
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setSnackbar({
        isOpen: true,
        severity: "error",
        message: "Username can only contain letters and numbers",
      });
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    Accounts.createUser(
      { username, email, password },
      (error: Error | Meteor.Error | TypeError | undefined) => {
        if (error) {
          console.error("Registration failed", error);
          setSnackbar({
            isOpen: true,
            severity: "error",
            message: error.message || "Registration failed",
          });
        } else {
          console.log("Registration successful");
          setSnackbar({
            isOpen: true,
            severity: "success",
            message: "Registration successful. Welcome, " + username,
          });
        }
      }
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography fontSize={60}>
        <LocationOnIcon fontSize="inherit" /> Adventure Routes
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        flexDirection="column"
        display="flex"
        width={400}
      >
        <Box display="flex" gap={2}>
          <TextField
            variant="filled"
            label="First Name"
            type="text"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            variant="filled"
            label="Last Name"
            type="text"
            margin="normal"
            fullWidth
            required
          />
        </Box>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          label="Email"
          type="email"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
          label="Username"
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
        <TextField
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          variant="filled"
          label="Confirm Password"
          type="password"
          margin="normal"
          fullWidth
          required
        />
        <Button sx={{ alignSelf: "center" }} type="submit" variant="contained">
          Register
        </Button>
      </Box>
      <Button onClick={() => navigate("/login")} variant="text">
        Already have an account? Login here
      </Button>
    </Box>
  );
};
