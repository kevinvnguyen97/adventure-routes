import React from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  AppBar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Meteor } from "meteor/meteor";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";

export const NavigationBar = () => {
  const { setSnackbar } = useAlertSnackbar();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <LocationOnIcon fontSize="large" />
        <IconButton
          onClick={() =>
            Meteor.logout((error) => {
              if (error) {
                console.error("Logout failed", error);
                setSnackbar({
                  isOpen: true,
                  severity: "error",
                  message: error.message || "Logout failed",
                });
              } else {
                console.log("Logout successful");
                setSnackbar({
                  isOpen: true,
                  severity: "success",
                  message: "Logout successful",
                });
              }
            })
          }
        >
          <Avatar />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
