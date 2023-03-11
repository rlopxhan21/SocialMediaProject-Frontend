import React from "react";
import { useParams } from "react-router-dom";

import { useGetDetailPost } from "../../../hooks/PostHooks/useGetDetailPost";

import { ImageViewer } from "../../Layout/ImageViewer/ImageViewer";
import { Error } from "../../Layout/Error/Error";
import { Loading } from "../../Layout/Loading/Loading";
import { PostImage } from "./PostImage";
import { PostCard } from "./PostCard";

import { Stack, useMediaQuery } from "@mui/material";

export const DetailPost = () => {
  const [imageViewer, setImageViewer] = React.useState(false);

  const { postID } = useParams();

  const extraLarge = useMediaQuery((theme) => theme.breakpoints.only("xl"));

  const {
    detailPostData: postData,
    detailPostLoading,
    detailPostError,
    fetchDetailPostData,
  } = useGetDetailPost();

  React.useEffect(() => {
    fetchDetailPostData(postID);
  }, [fetchDetailPostData, postID]);

  if (detailPostLoading) {
    return <Loading loading={detailPostLoading} />;
  }

  if (detailPostError) {
    return <Error />;
  }

  return (
    <Stack
      flex={6}
      direction="row"
      flexGrow={6}
      marginBottom={8}
      minHeight="100vh"
    >
      {extraLarge && (
        <PostImage postData={postData} setImageViewer={setImageViewer} />
      )}
      <PostCard
        postData={postData}
        setImageViewer={setImageViewer}
        postID={postID}
      />
      <ImageViewer
        postData={postData}
        imageViewer={imageViewer}
        setImageViewer={setImageViewer}
      />
    </Stack>
  );
};
