import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Book, Create, Groups, Home, People } from "@mui/icons-material";

export const MobileBottom = () => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          component={RouterLink}
          to="/"
        />
        <BottomNavigationAction label="Friends" icon={<People />} disabled />
        <BottomNavigationAction label="Write Post" icon={<Create />} />
        <BottomNavigationAction label="Groups" icon={<Groups />} disabled />
        <BottomNavigationAction label="Blog Posts" icon={<Book />} disabled />
      </BottomNavigation>
    </Paper>
  );
};
