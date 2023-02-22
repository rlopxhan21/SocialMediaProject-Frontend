import React from "react";
import Header from "../components/Layout/Header";
import Profile from "../components/ProfileAccount/Profile";
import MobileBottom from "../components/Layout/MobileBottom";
import { useParams } from "react-router-dom";
import { useGetRequest } from "../hooks/api";

const ProfilePage = () => {
  const { profileID } = useParams();

  const {
    data: profileData,
    loading,
    error,
  } = useGetRequest(`useraccount/userinfo/${profileID}`);

  return (
    <React.Fragment>
      <Header />
      <Profile profileData={profileData} loading={loading} error={error} />
      <MobileBottom />
    </React.Fragment>
  );
};

export default ProfilePage;
