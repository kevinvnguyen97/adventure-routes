import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    Accounts.createUser(
      { username, email, password },
      (error: Error | Meteor.Error | TypeError | undefined) => {
        if (error) console.error(error);
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
        justifyContent="center"
        gap={2}
      >
        <Box display="flex" gap={2}>
          <TextField variant="filled" label="First Name" type="text" />
          <TextField variant="filled" label="Last Name" type="text" />
        </Box>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          label="Email"
          type="email"
        />
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="filled"
          label="Username"
          type="text"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          label="Password"
          type="password"
        />
        <TextField
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          variant="filled"
          label="Confirm Password"
          type="password"
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
      <Button onClick={() => navigate("/login")} variant="text">
        Already have an account? Login here
      </Button>
    </Box>
  );
};
