import React from "react";

import Login from "../components/Registration/Login";
import { Header } from "../components/Layout/Header/Header";

export const LoginPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Login />
    </React.Fragment>
  );
};
