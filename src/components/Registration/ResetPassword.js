import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../Layout/Header";

const ResetPassword = () => {
  const [error, setError] = React.useState(false);

  const onPasswordSubmitHandler = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const re_password = event.target.password2.value;

    if (password.length > 7 && re_password > 7 && password === re_password) {
      console.log(password, re_password);
    } else {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <Header />
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
          Reset Password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={onPasswordSubmitHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={error}
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
                error={error}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Password
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ResetPassword;
