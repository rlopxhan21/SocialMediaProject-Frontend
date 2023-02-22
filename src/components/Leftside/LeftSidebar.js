import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AccountBox,
  Book,
  Groups,
  Home,
  People,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const LeftSidebar = () => {
  return (
    <Box
      flex={1}
      flexGrow={1}
      p={2}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <Box position="fixed" flexGrow={1}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{
                  display: { xs: "none", lg: "inherit" },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding disabled>
            <ListItemButton>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText
                primary="Friends"
                sx={{ display: { xs: "none", lg: "inherit" } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/profile/1">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                sx={{ display: { xs: "none", lg: "inherit" } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding disabled>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{ display: { xs: "none", lg: "inherit" } }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding disabled>
            <ListItemButton>
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText
                primary="Groups"
                sx={{ display: { xs: "none", lg: "inherit" } }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding disabled>
            <ListItemButton>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText
                primary="Blog Posts"
                sx={{ display: { xs: "none", lg: "inherit" } }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftSidebar;
