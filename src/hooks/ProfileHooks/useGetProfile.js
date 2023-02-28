import React from "react";
import axios from "axios";

export const useGetProfile = () => {
  const [profileData, setProfileData] = React.useState(null);
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");

  const fetchProfileData = async (profileID) => {
    setProfileLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url:
          process.env.REACT_APP_BASE_URL +
          `/useraccount/userinfo/${profileID}/`,
      });
      setProfileData(response.data);
      setProfileLoading(false);
    } catch (error) {
      setProfileError(error.response);
      setProfileLoading(false);
    }
  };

  return { profileData, profileLoading, profileError, fetchProfileData };
};
