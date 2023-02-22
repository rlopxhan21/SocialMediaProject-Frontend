import { createTheme, Fab, ThemeProvider, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import PostDetailPage from "./Pages/PostDetailPage";
import { DarkMode, KeyboardArrowUp } from "@mui/icons-material";
import ProfilePage from "./Pages/ProfilePage";
import AccountActivation from "./components/Registration/AccountActivation";
import ResetPassword from "./components/Registration/ResetPassword";
import { useAuthGetRequest } from "./hooks/api";
import { authActions } from "./Redux/authSlice";

function App() {
  const [mode, setMode] = useState("light");

  // Importing disptach for sending current user info
  const dispatch = useDispatch();

  // Importing Authentication State
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    components: {
      MuiBadge: {
        styleOverrides: {
          badge: {
            padding: "0",
          },
        },
      },
    },
  });

  // Receiving Current User data
  const currentUserID = useSelector((state) => state.auth.currentUserID);
  const { data: profileData } = useAuthGetRequest(
    `useraccount/userinfo/${currentUserID}/`
  );

  profileData && dispatch(authActions.updateCurrentUserData(profileData));

  return (
    <ThemeProvider theme={darkTheme}>
      <Tooltip title="Change mode" placement="top">
        <Fab
          color="primary"
          aria-label="darklight-mode"
          size="medium"
          sx={{
            position: "fixed",
            bottom: "8rem",
            right: "1rem",
          }}
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        >
          <DarkMode />
        </Fab>
      </Tooltip>

      <Tooltip title="Scroll to top" placement="top">
        <Fab
          color="primary"
          aria-label="scroll-to-top"
          size="medium"
          sx={{
            position: "fixed",
            bottom: "4rem",
            right: "1rem",
          }}
          component="a"
          href="#home"
        >
          <KeyboardArrowUp />
        </Fab>
      </Tooltip>

      <Routes>
        {isLoggedIn && (
          <Route path="/login" element={<Navigate to="/" replace />} />
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postID" element={<PostDetailPage />} />
        <Route path="/profile/:profileID" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account/activate" element={<AccountActivation />} />
        <Route path="/account/resetpassword" element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;