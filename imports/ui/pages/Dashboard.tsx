import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Box, Button, Grid } from "@mui/material";

import { useMeteorAuth } from "/imports/providers/Auth";
import { useAdventureRoutesForUser } from "/imports/providers/adventureRoutes";
import { AddOrEditRouteModal } from "/imports/ui/components/AddOrEditRouteModal";
import { meteorMethodPromise } from "/imports/util";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { RouteCard } from "/imports/ui/components/RouteCard";

export const Dashboard = () => {
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  const { userId = "" } = useMeteorAuth();
  const { data: adventureRoutes } = useAdventureRoutesForUser(userId ?? "");
  const { setSnackbar } = useAlertSnackbar();

  useEffect(() => {
    window.document.title = "Dashboard";
  }, []);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <AddOrEditRouteModal
        isOpen={isRouteModalOpen}
        onClose={handleRouteModalClose}
      />
      <Button onClick={handleRouteModalOpen} sx={{ alignSelf: "center" }}>
        Create Adventure Route
      </Button>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
          display: "flex",
        }}
      >
        {adventureRoutes.map((adventureRoute) => (
          <Grid
            key={adventureRoute._id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            sx={{ alignItems: "stretch" }}
          >
            <RouteCard
              adventureRoute={adventureRoute}
              deleteAdventureRoute={() =>
                removeAdventureRoute(adventureRoute._id ?? "")
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
