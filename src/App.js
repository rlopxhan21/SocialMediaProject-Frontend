import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./Redux/authSlice";

import { useAuthGetRequest } from "./hooks/api";
import { useTheme } from "./components/Theme/useTheme";

import { HomePage } from "./Pages/HomePage";
import { LoginPage } from "./Pages/LoginPage";
import { PostDetailPage } from "./Pages/PostDetailPage";
import { AccountActivated } from "./Pages/AccountActivated";
import { PasswordReset } from "./Pages/PasswordReset";
import { ProfilePage } from "./Pages/ProfilePage";
import { AccountActivation } from "./components/Account/AccountActivation";
import { ResetPassword } from "./components/Account/ResetPassword";
import { DarkNScrollUp } from "./components/Layout/Fab/DarkNScrollUp";

import { ThemeProvider } from "@mui/material";
import { Header } from "./components/Layout/Header/Header";
import { MobileBottom } from "./components/Layout/BottomNav/MobileBottom";

function App() {
  const dispatch = useDispatch();
  const { mode, setMode, theme } = useTheme();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Receiving Current User data
  const currentUserID = useSelector((state) => state.auth.currentUserID);
  const { data: profileData } = useAuthGetRequest(
    `useraccount/userinfo/${currentUserID}/`
  );

  React.useEffect(() => {
    profileData && dispatch(authActions.updateCurrentUserData(profileData));
  }, [profileData, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <DarkNScrollUp setMode={setMode} mode={mode} />
      <Routes>
        {isLoggedIn && (
          <Route path="/login" element={<Navigate to="/" replace />} />
        )}
        {isLoggedIn && (
          <Route
            path="/account/activate"
            element={<Navigate to="/" replace />}
          />
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postID" element={<PostDetailPage />} />
        <Route path="/profile/:profileID" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account/activate" element={<AccountActivation />} />
        <Route path="/account/resetpassword" element={<ResetPassword />} />
        <Route path="account/:UUID/:tokenID" element={<AccountActivated />} />
        <Route path="password/:UUID/:tokenID" element={<PasswordReset />} />
      </Routes>
      <MobileBottom />
    </ThemeProvider>
  );
}

export default App;
