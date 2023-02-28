import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const ForgetPassword = (props) => {
  const [forgetError, setForgetError] = React.useState(false);

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
    <React.Fragment>
      {props.open === "forget_password" && (
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
