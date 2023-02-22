import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import Header from "../Layout/Header";

const AccountActivation = () => {
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
          // onSubmit={onLoginSubmitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography>
            Activate your account from the link sent to your email. And Use this
            button to sign in the system.
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Click here after Account Activation
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AccountActivation;
