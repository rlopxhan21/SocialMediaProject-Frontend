import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../Redux/authSlice";
import { usePostRequest } from "../../hooks/api";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

const Login = () => {
  const [open, setOpen] = React.useState("login");
  const [loginError, setLoginError] = React.useState("pass");
  const [regsiterError, setRegisterError] = React.useState("pass");
  const [forgetError, setForgetError] = React.useState(false);

  const navigate = useNavigate();

  // Calling Custom Hook for Login, Registration & Forget Password
  const [urlData, setUrlData] = React.useState({ url: "", data: "" });
  const { data, loading, error } = usePostRequest(urlData.url, urlData.data);

  error && console.log(error);

  // For dispatching data to authSlice
  const dispatch = useDispatch();

  data?.access && dispatch(authActions.loginHandler(data));

  data?.username && dispatch(authActions.registerNewUser(data));

  data?.username && navigate("/account/activate");

  // Function for submitting Login Form
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

      setUrlData({ url: "auth/jwt/create/", data: signInData });
    }
  };

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

      const registerData = {
        first_name,
        last_name,
        username,
        email,
        password,
        re_password,
      };

      setUrlData({ url: "auth/users/", data: registerData });
    }
  };

  const onForgetPasswordSubmitHandler = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const emailvalid = event.target.emailvalid.checked;

    if (email.includes("@")) {
      if (emailvalid) {
        setForgetError(false);

        const forgetData = {
          email,
          emailvalid,
        };
        console.log(forgetData);
      }
    } else {
      setForgetError(true);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      backgroundColor={"background.default"}
      color={"text.primary"}
    >
      <CssBaseline />

      {/* Login Form */}
      {open === "login" && (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
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
            {error && (
              <Typography color={"error"}>{error.data.detail}</Typography>
            )}
            {!loading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            {loading && (
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
                  onClick={() => setOpen("forget_password")}
                  variant="body2"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => setOpen("register")}
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

      {/* Registration Form */}
      {open === "register" && (
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
            <LockOutlinedIcon />
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
                    regsiterError === "firstName" || regsiterError === "all"
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
                    regsiterError === "lastName" || regsiterError === "all"
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
                    regsiterError === "username" || regsiterError === "all"
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
                  error={regsiterError === "email" || regsiterError === "all"}
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
                    regsiterError === "password" || regsiterError === "all"
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
                    regsiterError === "password" || regsiterError === "all"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                {error && (
                  <Box>
                    {error.data.username && (
                      <Typography color={"error"}>
                        Username: {error.data.username}
                      </Typography>
                    )}
                    {error.data.email && (
                      <Typography color={"error"}>
                        Email: A {error.data.email}
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>

            {!loading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            {loading && (
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
                  onClick={() => setOpen("login")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      {/* Forget Password Form */}
      {open === "forget_password" && (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onForgetPasswordSubmitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={forgetError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Please check this box if the above email address is correct."
                  name="emailvalid"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Link
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => setOpen("login")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Login;
