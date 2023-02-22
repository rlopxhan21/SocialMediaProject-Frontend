import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "../components/Layout/Header";
import MobileBottom from "../components/Layout/MobileBottom";
import DetailPost from "../components/Middle/DetailPost";

const PostDetailPage = () => {
  return (
    <Box backgroundColor={"background.default"} color={"text.primary"}>
      <Header />

      <Stack direction="row" justifyContent="space-between">
        <DetailPost />
      </Stack>
      <MobileBottom />
    </Box>
  );
};

export default PostDetailPage;
