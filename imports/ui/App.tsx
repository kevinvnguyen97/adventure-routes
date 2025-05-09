import React from "react";

import {
  AppBar,
  Avatar,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const App = () => (
  <AppBar position="sticky">
    <Toolbar>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <LocationOnIcon fontSize="large" />
      <Typography
        textAlign="center"
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Login
      </Typography>
      <Avatar />
    </Toolbar>
  </AppBar>
);
