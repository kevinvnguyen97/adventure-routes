import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMeteorAuth } from "/imports/providers/Auth";
import { useAdventureRoutesForUser } from "/imports/providers/adventureRoutes";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userId = "" } = useMeteorAuth();
  const { data: adventureRoutes, isLoading } = useAdventureRoutesForUser(
    userId ?? ""
  );
  return (
    <Box>
      <Box>Dashboard</Box>
      <Box>
        {adventureRoutes.map((adventureRoute) => (
          <Box key={adventureRoute._id}>{adventureRoute.name}</Box>
        ))}
      </Box>
      <Button>Create Adventure Route</Button>
    </Box>
  );
};
