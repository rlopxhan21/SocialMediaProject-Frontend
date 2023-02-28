import React from "react";
import axios from "axios";

export const useLogin = () => {
  const [loginData, setLoginData] = React.useState(null);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const sendLoginReq = async (logData) => {
    setLoginLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL + "/auth/jwt/create/",
        headers: {
          "Content-Type": "application/json",
        },
        data: logData,
      });

      setLoginData(response.data);
      setLoginLoading(false);
    } catch (error) {
      setLoginLoading(false);
      setLoginError(error.response);
    }
  };

  return { loginData, loginLoading, loginError, sendLoginReq };
};
