import React from "react";

import { Alert, Box } from "@mui/material";

export const Error = () => {
  return (
    <Box flex={4} p={2} flexGrow={4} marginBottom={8} id="home">
      <Alert severity="error">
        Error! Request failed with status code 404. Please refresh to try
        loading again.
      </Alert>
    </Box>
  );
};
