import React, { useState, MouseEvent, ChangeEvent } from "react";
import {
  Toolbar,
  IconButton,
  Avatar,
  AppBar,
  Menu,
  Theme,
  SxProps,
  MenuItem,
  ListItemIcon,
  ListItem,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Meteor } from "meteor/meteor";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { Logout, Settings, PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMeteorAuth } from "/imports/providers/Auth";
import { meteorMethodPromise } from "/imports/util";
import { uploadToImgBB } from "/imports/api/imgbb";

const PROFILE_MENU_ID = "profile-menu";
const MENU_STYLE: SxProps<Theme> = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
};
const NAV_MENU_ID = "nav-menu";

const MobileNavFormat = () => {
  const [anchorNavElement, setAnchorNavElement] =
    useState<HTMLButtonElement | null>(null);
  const isNavMenuOpen = Boolean(anchorNavElement);

  const { loggedIn } = useMeteorAuth();
  const navigate = useNavigate();

  const handleNavMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorNavElement(event.currentTarget);
  };
  const handleNavMenuClose = () => {
    setAnchorNavElement(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleNavMenuOpen}
          aria-controls={isNavMenuOpen ? NAV_MENU_ID : undefined}
          disabled={!loggedIn}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="nav-menu"
          variant="selectedMenu"
          open={isNavMenuOpen}
          anchorEl={anchorNavElement}
          onClose={handleNavMenuClose}
          onClick={handleNavMenuClose}
          slotProps={{ paper: { elevation: 2, sx: MENU_STYLE } }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/")}>Dashboard</MenuItem>
          <MenuItem disabled>Other Users</MenuItem>
        </Menu>
      </Box>
      <LocationOnIcon
        fontSize="large"
        sx={{ display: { xs: "block", md: "none" } }}
      />
    </>
  );
};

const DesktopNavFormat = () => {
  const navigate = useNavigate();
  const { loggedIn } = useMeteorAuth();

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Typography fontSize={30} mr={3}>
        <LocationOnIcon fontSize="inherit" /> Adventure Routes
      </Typography>
      {loggedIn && (
        <>
          <Button
            sx={{ color: "white", textTransform: "none" }}
            onClick={() => navigate("/")}
            size="large"
          >
            Dashboard
          </Button>
          <Button
            sx={{ color: "white", textTransform: "none" }}
            onClick={() => navigate("/other-users")}
            size="large"
          >
            Other Users
          </Button>
        </>
      )}
    </Box>
  );
};

export const NavigationBar = () => {
  const [anchorUserElement, setAnchorUserElement] =
    useState<HTMLButtonElement | null>(null);

  const { loggedIn, user } = useMeteorAuth();
  const { profile, _id } = user || {};
  const {
    firstName = "",
    lastName = "",
    profilePictureUrl = "",
  } = profile || {};
  const { setSnackbar } = useAlertSnackbar();
  const isUserMenuOpen = Boolean(anchorUserElement);

  const handleUserMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorUserElement(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorUserElement(null);
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
  const uploadProfilePicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    console.log("UPLOADING...");
    if (files.length > 0) {
      const file = files[0];

      try {
        const response = await uploadToImgBB(file, _id ?? "");
        if (response.data) {
          await meteorMethodPromise("changeProfilePicture", response.data?.url);
          setSnackbar({
            isOpen: true,
            message: "Profile picture uploaded successfully",
            severity: "success",
          });
        }
      } catch (error) {
        const meteorError = error as Meteor.Error;
        console.error(meteorError);
        setSnackbar({
          isOpen: true,
          message: meteorError.message,
          severity: "error",
        });
      }
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="photo-upload"
        onChange={uploadProfilePicture}
        name="profile-picture"
      />
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <DesktopNavFormat />
          <MobileNavFormat />
          <IconButton
            onClick={handleUserMenuOpen}
            aria-controls={isUserMenuOpen ? PROFILE_MENU_ID : undefined}
            disabled={!loggedIn}
          >
            <Avatar src={profilePictureUrl}>
              {user ? firstName?.[0] + lastName?.[0] : ""}
            </Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
            variant="selectedMenu"
            open={isUserMenuOpen}
            anchorEl={anchorUserElement}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            slotProps={{
              paper: {
                elevation: 2,
                sx: MENU_STYLE,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <ListItem>
              <Avatar src={profilePictureUrl}>
                {user ? firstName?.[0] + lastName?.[0] : ""}
              </Avatar>
              {user?.username}
            </ListItem>
            <MenuItem disabled>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <label htmlFor="photo-upload">
                <ListItemIcon sx={{ cursor: "pointer" }}>
                  <PhotoCamera />
                </ListItemIcon>
                Upload Profile Picture
              </label>
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
      {/** Filler behind the actual app bar when scrolling */}
      <AppBar position="relative" sx={{ visibility: "hidden", margin: 0 }}>
        <Toolbar />
      </AppBar>
    </Box>
  );
};
