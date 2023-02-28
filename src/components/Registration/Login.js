import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/AuthHooks/useLogin";
import { authActions } from "../../Redux/authSlice";

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LockOutlined, Save } from "@mui/icons-material";

export const Login = (props) => {
  const [loginError, setLoginError] = React.useState("pass");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loginData,
    loginLoading,
    loginError: loginErrorBackend,
    sendLoginReq,
  } = useLogin();

  React.useEffect(() => {
    loginData && dispatch(authActions.loginHandler(loginData));
    loginData && navigate("/");
  }, [loginData, dispatch, navigate]);

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !event.target.email.value.includes("@") &&
      !(event.target.password.value.length > 7)
    ) {
      setLoginError("both");
    } else if (!event.target.email.value.includes("@")) {
      setLoginError("email");
    } else if (event.target.password.value.length < 8) {
      setLoginError("password");
    } else {
      setLoginError("pass");

      const signInData = {
        email: event.target.email.value,
        password: event.target.password.value,
      };

      sendLoginReq(signInData);
    }
  };

  return (
    <React.Fragment>
      {props.open === "login" && (
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={onLoginSubmitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              error={loginError === "email" || loginError === "both"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={loginError === "password" || loginError === "both"}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loginErrorBackend && (
              <Typography color={"error"}>
                {loginErrorBackend.data.detail}
              </Typography>
            )}
            {!loginLoading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            {loginLoading && (
              <LoadingButton
                loading
                type="submit"
                fullWidth
                variant="contained"
                loadingPosition="start"
                startIcon={<Save />}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
            )}

            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => props.setOpen("forget_password")}
                  variant="body2"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => props.setOpen("register")}
                  variant="body2"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};
