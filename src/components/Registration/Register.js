import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../Redux/authSlice";
import { useRegister } from "../../hooks/AuthHooks/useRegister";

import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LockOutlined, Save } from "@mui/icons-material";

export const Register = (props) => {
  const [registerError, setRegisterError] = React.useState("pass");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registerData,
    registerLoading,
    registerError: registerErrorBackend,
    sendRegisterReq,
  } = useRegister();

  React.useEffect(() => {
    registerData && dispatch(authActions.registerNewUser(registerData));
    registerData && navigate("/account/activate");
  }, [registerData, dispatch, navigate]);

  const onRegisterSubmitHandler = (event) => {
    event.preventDefault();

    const first_name = event.target.firstName.value;
    const last_name = event.target.lastName.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const re_password = event.target.password2.value;

    if (
      first_name.length < 2 &&
      last_name.length < 2 &&
      username.length < 2 &&
      !email.includes("@") &&
      password.length < 8 &&
      re_password.length < 8
    ) {
      setRegisterError("all");
    } else if (first_name.length < 2) {
      setRegisterError("firstName");
    } else if (last_name.length < 2) {
      setRegisterError("lastName");
    } else if (username.length < 2) {
      setRegisterError("username");
    } else if (!email.includes("@")) {
      setRegisterError("email");
    } else if (
      password !== re_password ||
      password.length < 7 ||
      re_password < 7
    ) {
      setRegisterError("password");
    } else {
      setRegisterError("pass");

      const regData = {
        first_name,
        last_name,
        username,
        email,
        password,
        re_password,
      };

      sendRegisterReq(regData);
    }
  };
  return (
    <React.Fragment>
      {props.open === "register" && (
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onRegisterSubmitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={
                    registerError === "firstName" || registerError === "all"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={
                    registerError === "lastName" || registerError === "all"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={
                    registerError === "username" || registerError === "all"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={registerError === "email" || registerError === "all"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={
                    registerError === "password" || registerError === "all"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  error={
                    registerError === "password" || registerError === "all"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                {registerErrorBackend && (
                  <Box>
                    {registerErrorBackend.data.username && (
                      <Typography color={"error"}>
                        Username: {registerErrorBackend.data.username}
                      </Typography>
                    )}
                    {registerErrorBackend.data.email && (
                      <Typography color={"error"}>
                        Email: A {registerErrorBackend.data.email}
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>

            {!registerLoading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            {registerLoading && (
              <LoadingButton
                loading
                type="submit"
                fullWidth
                variant="contained"
                loadingPosition="start"
                startIcon={<Save />}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </LoadingButton>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => props.setOpen("login")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};
