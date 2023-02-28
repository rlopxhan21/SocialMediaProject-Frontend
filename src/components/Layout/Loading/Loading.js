import React from "react";

import { Backdrop, Box, CircularProgress } from "@mui/material";

export const Loading = (props) => {
  return (
    <Box flex={4} p={2} flexGrow={4} marginBottom={8} id="home">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
