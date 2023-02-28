import React from "react";
import { useParams } from "react-router-dom";

import { useGetProfile } from "../hooks/ProfileHooks/useGetProfile";

import { Profile } from "../components/ProfileAccount/Profile";

export const ProfilePage = () => {
  const { profileID } = useParams();

  const { profileData, profileLoading, profileError, fetchProfileData } =
    useGetProfile();

  React.useEffect(() => {
    fetchProfileData(profileID);
  }, []);

  return (
    <React.Fragment>
      <Profile
        profileData={profileData}
        loading={profileLoading}
        error={profileError}
      />
    </React.Fragment>
  );
};
