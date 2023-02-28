import React from "react";
import axios from "axios";

export const useRegister = () => {
  const [registerData, setRegisterData] = React.useState(null);
  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");

  const sendRegisterReq = async (regData) => {
    setRegisterLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL + "/auth/users/",
        headers: {
          "Content-Type": "application/json",
        },
        data: regData,
      });

      setRegisterData(response.data);
      setRegisterLoading(false);
    } catch (error) {
      setRegisterLoading(false);
      setRegisterError(error.response);
    }
  };

  return { registerData, registerLoading, registerError, sendRegisterReq };
};
