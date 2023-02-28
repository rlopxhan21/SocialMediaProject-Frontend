import React from "react";

import { Login } from "./Login";
import { Register } from "./Register";
import { ForgetPassword } from "./ForgetPassword";

import { Container, CssBaseline } from "@mui/material";

export const Authentication = () => {
  const [open, setOpen] = React.useState("login");

  return (
    <Container
      component="main"
      maxWidth="xs"
      backgroundColor={"background.default"}
      color={"text.primary"}
    >
      <CssBaseline />
      <Login open={open} setOpen={setOpen} />
      <Register open={open} setOpen={setOpen} />
      <ForgetPassword open={open} setOpen={setOpen} />
    </Container>
  );
};
