import React from "react";

import { LeftSidebar } from "../components/Leftside/LeftSidebar";
import { PublicFeed } from "../components/Middle/PublicFeed";
import { RightSidebar } from "../components/Rightside/RightSidebar";

import { Stack } from "@mui/material";

export const HomePage = (props) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      backgroundColor={"background.default"}
      color={"text.primary"}
    >
      <LeftSidebar />
      <PublicFeed />
      <RightSidebar />
    </Stack>
  );
};
