import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Chat,
  DeveloperBoard,
  KeyboardArrowDown,
  Logout,
  Notifications,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Box,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { usePostRequest } from "../../../hooks/api";
import { authActions } from "../../../Redux/authSlice";

const DUMMY_DATA = [];

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Header = () => {
  // React Redux recieving data and sending it
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const profileOpen = Boolean(profileAnchorEl);

  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const notificationOpen = Boolean(notificationAnchorEl);

  const [messagesAnchorEl, setMessagesAnchorEl] = React.useState(null);
  const messagesOpen = Boolean(messagesAnchorEl);

  // Receiving Current User data
  const profileData = useSelector((state) => state.auth.currentUserData);

  // Logging user out function
  const [urlData, setUrlData] = React.useState({ url: "", data: "" });
  usePostRequest(urlData.url, urlData.data);

  const onLogoutHandler = () => {
    setUrlData({ url: "useraccount/token/blacklist", data: {} });
    dispatch(authActions.logoutHandler());
  };

  const profileHandleClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const profileHandleClose = () => {
    setProfileAnchorEl(null);
  };

  const notificationHandleClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const notificationHandleClose = () => {
    setNotificationAnchorEl(null);
  };

  const messagesHandleClick = (event) => {
    setMessagesAnchorEl(event.currentTarget);
  };
  const messagesHandleClose = () => {
    setMessagesAnchorEl(null);
  };

  // Importing current user ID
  const currentUserID = useSelector((state) => state.auth.currentUserID);

  return (
    <AppBar position="sticky">
      <StyledToolBar>
        {/* Logo and Brand Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
          component={RouterLink}
          to="/"
        >
          <IconButton>
            <DeveloperBoard color="error" fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ display: { xs: "none", sm: "inline-block" } }}
          >
            Lopxhan Media
          </Typography>
        </Box>

        {/* Nav Links  */}
        {isLoggedIn && (
          <Box>
            {/* <Tooltip title="Messages"> */}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={messagesHandleClick}
              disabled
            >
              <Badge badgeContent={0} color="error" overlap="circular" max={9}>
                <Chat />
              </Badge>
            </IconButton>
            {/* </Tooltip> */}
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={notificationHandleClick}
                disabled
              >
                <Badge
                  badgeContent={0}
                  color="error"
                  max={9}
                  overlap="circular"
                >
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account Settings">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={profileHandleClick}
              >
                <Badge
                  badgeContent={<KeyboardArrowDown fontSize="small" />}
                  overlap="circular"
                  color="error"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    alt={profileData && profileData.first_name}
                    src={profileData && profileData.imagefield}
                    size="small"
                  >
                    {profileData && profileData.first_name[0]}
                  </Avatar>
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {!isLoggedIn && (
          <Button
            variant="text"
            sx={{ color: "white" }}
            color="warning"
            component={RouterLink}
            to="/login"
          >
            Login/ Register
          </Button>
        )}
      </StyledToolBar>

      {/* DropDown Menu for Messages */}
      <Menu
        anchorEl={messagesAnchorEl}
        color="primary"
        id="notification-menu"
        open={messagesOpen}
        onClose={messagesHandleClose}
        onClick={messagesHandleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "scroll",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography variant="h6" fontWeight={800} marginLeft={2}>
          Messages
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            maxHeight: "50vh",
            bgcolor: "background.paper",
          }}
        >
          {/* {DUMMY_DATA.map((item) => (
            <RecentActivities key={item.id} />
          ))} */}
        </List>
      </Menu>

      {/* DropDown Menu for Notifications */}
      <Menu
        anchorEl={notificationAnchorEl}
        color="primary"
        id="notification-menu"
        open={notificationOpen}
        onClose={notificationHandleClose}
        onClick={notificationHandleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "scroll",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography variant="h6" fontWeight={800} marginLeft={2}>
          Notifications
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            maxHeight: "50vh",
            bgcolor: "background.paper",
          }}
        >
          {/* {DUMMY_DATA.map((item) => (
            <RecentActivities key={item.id} />
          ))} */}
          {DUMMY_DATA.length === 0 && (
            <Typography>No notification found!</Typography>
          )}
        </List>
      </Menu>

      {/* DropDown Menu for Profiles */}
      <Menu
        anchorEl={profileAnchorEl}
        color="primary"
        id="account-menu"
        open={profileOpen}
        onClose={profileHandleClose}
        onClick={profileHandleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          component={RouterLink}
          to={`/profile/${currentUserID ? currentUserID : 1}`}
        >
          <Avatar
            alt={profileData && profileData.first_name}
            src={profileData && profileData.imagefield}
            size="small"
          >
            {profileData && profileData.first_name[0]}
          </Avatar>{" "}
          Profile
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={onLogoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
