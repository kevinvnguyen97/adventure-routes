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
        <Button
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
        </Button>
      </Toolbar>
    </AppBar>
  );
};
