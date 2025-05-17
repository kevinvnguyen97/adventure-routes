import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};
