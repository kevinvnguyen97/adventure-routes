import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useMeteorAuth } from "/imports/providers/Auth";
import { useAdventureRoutesForUser } from "/imports/providers/adventureRoutes";
import { AddOrEditRouteModal } from "/imports/ui/components/AddOrEditRouteModal";
import { Edit, Map, Remove } from "@mui/icons-material";
import { meteorMethodPromise } from "/imports/util";
import { Meteor } from "meteor/meteor";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  const navigate = useNavigate();
  const { userId = "" } = useMeteorAuth();
  const { data: adventureRoutes } = useAdventureRoutesForUser(userId ?? "");
  const { setSnackbar } = useAlertSnackbar();

  const handleRouteModalOpen = () => {
    setIsRouteModalOpen(true);
  };
  const handleRouteModalClose = () => {
    setIsRouteModalOpen(false);
  };
  const removeAdventureRoute = async (adventureRouteId: string) => {
    try {
      await meteorMethodPromise("deleteAdventureRoute", adventureRouteId);
      setSnackbar({
        isOpen: true,
        message: "Adventure route deleted successfully",
        severity: "success",
      });
    } catch (error) {
      if (error instanceof Meteor.Error) {
        console.error("Error deleting adventure route:", error.message);
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    }
  };
  return (
    <Box>
      <Box>Dashboard</Box>
      <AddOrEditRouteModal
        isOpen={isRouteModalOpen}
        onClose={handleRouteModalClose}
      />
      <Box>
        {adventureRoutes.map((adventureRoute) => (
          <Box display="flex">
            <Box key={adventureRoute._id}>
              {adventureRoute._id}
              {adventureRoute.name}: {adventureRoute.route.origin} -{" "}
              {adventureRoute.route.destination}
            </Box>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton onClick={() => navigate(`/map/${adventureRoute._id}`)}>
              <Map />
            </IconButton>
            <IconButton>
              <Remove
                onClick={() => removeAdventureRoute(adventureRoute._id!)}
              />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button onClick={handleRouteModalOpen}>Create Adventure Route</Button>
    </Box>
  );
};
