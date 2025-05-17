import React, { useState, MouseEvent } from "react";
import {
  Toolbar,
  IconButton,
  Avatar,
  AppBar,
  Typography,
  Menu,
  Theme,
  SxProps,
  MenuItem,
  ListItemIcon,
  Box,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Meteor } from "meteor/meteor";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { Logout, Settings } from "@mui/icons-material";

const PROFILE_MENU_ID = "profile-menu";
const PROFILE_MENU_STYLE: SxProps<Theme> = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

export const NavigationBar = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );

  const userId = Meteor.userId();
  const { setSnackbar } = useAlertSnackbar();
  const isPopoverOpen = Boolean(anchorElement);

  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorElement(null);
  };
  const logout = () => {
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
    });
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <LocationOnIcon fontSize="large" />
        <IconButton
          onClick={handlePopoverOpen}
          aria-controls={isPopoverOpen ? PROFILE_MENU_ID : undefined}
          disabled={!userId}
        >
          <Avatar />
        </IconButton>
        <Menu
          id="profile-menu"
          variant="selectedMenu"
          open={isPopoverOpen}
          anchorEl={anchorElement}
          onClose={handlePopoverClose}
          onClick={handlePopoverClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: PROFILE_MENU_STYLE,
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <ListItem>
            <Avatar />
            Profile
          </ListItem>
          <MenuItem disabled>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
