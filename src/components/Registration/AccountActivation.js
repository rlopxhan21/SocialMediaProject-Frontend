import React from "react";
import Header from "../Layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { usePostRequest } from "../../hooks/api";
import { authActions } from "../../Redux/authSlice";

const AccountActivation = () => {
  // Sending Data for login after activation
  const [urlData, setUrlData] = React.useState({ url: "", data: "" });
  const { data, error, loading } = usePostRequest(urlData.url, urlData.data);

  // Checking password field validity
  const [passwordFieldError, setPasswordFieldError] = React.useState(false);

  const dispatch = useDispatch();

  const activatedUserData = useSelector(
    (state) => state.auth.unactivatedUserData
  );

  data?.access && dispatch(authActions.loginHandler(data));

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();
    const password = event.target.password1.value;

    if (password.length < 7) {
      setPasswordFieldError(true);
      return;
    }

    const loginData = {
      email: activatedUserData?.email,
      password: password,
    };

    setUrlData({ url: "auth/jwt/create/", data: loginData });
  };

  return (
    <React.Fragment>
      <Header />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account Activation
        </Typography>
        <Box
          component="form"
          onSubmit={onLoginSubmitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography>
            Activate your account from the link sent to your email. And Use this
            button to sign in the system.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password*"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordFieldError}
            sx={{ my: "1rem" }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In Again after Account Activation
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AccountActivation;
