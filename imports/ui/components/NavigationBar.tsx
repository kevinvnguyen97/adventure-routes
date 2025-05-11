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

export const NavigationBar = () => {
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
        <Button onClick={() => Meteor.logout()}>
          <Avatar />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
