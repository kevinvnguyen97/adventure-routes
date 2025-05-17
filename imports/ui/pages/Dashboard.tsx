import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

import { useMeteorAuth } from "/imports/providers/Auth";
import { useAdventureRoutesForUser } from "/imports/providers/adventureRoutes";
import { AddOrEditRouteModal } from "/imports/ui/components/AddOrEditRouteModal";
import { meteorMethodPromise } from "/imports/util";
import { useAlertSnackbar } from "/imports/providers/AlertSnackbarProvider";
import { RouteCard } from "/imports/ui/components/RouteCard";
import { Loading } from "/imports/ui/pages/Loading";

export const Dashboard = () => {
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  const { userId = "" } = useMeteorAuth();
  const { data: adventureRoutes, isLoading: isAdventureRoutesLoading } =
    useAdventureRoutesForUser(userId ?? "");
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

  if (isAdventureRoutesLoading) {
    return <Loading />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      padding={2}
    >
      <Typography fontSize={60}>
        <LocationOn fontSize="inherit" /> Adventure Routes
      </Typography>
      <AddOrEditRouteModal
        isOpen={isRouteModalOpen}
        onClose={handleRouteModalClose}
      />
      <Box display="flex" gap={3} alignItems="center" justifyContent="center">
        <TextField
          variant="filled"
          size="medium"
          label="Search for a route"
          disabled
        />
        <Typography>or</Typography>
        <Button
          size="large"
          variant="contained"
          onClick={handleRouteModalOpen}
          sx={{ alignSelf: "center" }}
        >
          Create Adventure Route
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
          display: "flex",
          width: "100%",
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
