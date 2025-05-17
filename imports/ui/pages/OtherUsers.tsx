import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAllUsers } from "/imports/providers/adventureRoutes";
import { Loading } from "/imports/ui/pages/Loading";
import { useNavigate } from "react-router-dom";

export const OtherUsers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Other Users - Adventure Routes";
  }, []);

  const { data: users, isLoading: isUsersLoading } = useAllUsers();

  if (isUsersLoading) {
    <Loading />;
  }
  return (
    <Box padding={2}>
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
        {users.length > 0 ? (
          users.map((user) => (
            <Grid
              key={user._id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              sx={{ alignItems: "stretch" }}
            >
              <Button
                onClick={() => navigate(`/${user._id}`)}
                sx={{ padding: 0 }}
              >
                <Card
                  variant="elevation"
                  sx={{
                    padding: 2,
                    color: "white",
                    bgcolor: "transparent",
                  }}
                >
                  <Box display="flex" gap={2}>
                    <Avatar src={user.profile?.profilePictureUrl} />{" "}
                    <Typography variant="h5">{user.username}</Typography>
                  </Box>
                </Card>
              </Button>
            </Grid>
          ))
        ) : (
          <Typography variant="h5">No other users found</Typography>
        )}
      </Grid>
    </Box>
  );
};
