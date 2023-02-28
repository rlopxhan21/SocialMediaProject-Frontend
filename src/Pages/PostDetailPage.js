import React from "react";

import { DetailPost } from "../components/Middle/PostDetail/DetailPost";

import { Stack } from "@mui/material";

export const PostDetailPage = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      backgroundColor={"background.default"}
      color={"text.primary"}
    >
      <DetailPost />
    </Stack>
  );
};
