import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "../components/Layout/Header";
import LeftSidebar from "../components/Leftside/LeftSidebar";
import Feed from "../components/Middle/Feed";
import RightSidebar from "../components/Rightside/RightSidebar";
import MobileBottom from "../components/Layout/MobileBottom";

const HomePage = () => {
  return (
    <Box backgroundColor={"background.default"} color={"text.primary"}>
      <Header />

      <Stack direction="row" justifyContent="space-between">
        <LeftSidebar sx={{ display: { xs: "none", md: "block" } }} />
        <Feed />
        <RightSidebar sx={{ display: { xs: "none", md: "block" } }} />
      </Stack>
      <MobileBottom />
    </Box>
  );
};

export default HomePage;
